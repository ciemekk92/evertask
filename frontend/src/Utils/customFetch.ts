import { UserModel } from 'Models/UserModel';
import { LoadingModel } from 'Models/LoadingModel';
import { history } from 'Routes';

export const customFetch = async (url: string, init: RequestInit): Promise<Unrestricted> => {
  const token = UserModel.currentUserValue.accessToken;

  LoadingModel.increaseActiveCalls();

  try {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL_DEV
        : process.env.REACT_APP_API_URL_PROD;

    const result = await fetch(
      `${baseUrl}/${url}`,
      !token
        ? init
        : {
            ...init,
            headers: {
              ...init.headers,
              Authorization: `Bearer ${token}`
            }
          }
    );

    LoadingModel.decreaseActiveCalls();

    if (result.status === 403) {
      history.push('/forbidden');
      return;
    }

    if (result.status === 404) {
      history.push('/not_found');
      return;
    }

    return result;
  } catch (e: any) {
    LoadingModel.decreaseActiveCalls();

    throw new Error(e);
  }
};
