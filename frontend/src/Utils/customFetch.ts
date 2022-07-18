import { UserModel } from 'Models/UserModel';
import { history } from 'Routes';

export const customFetch = async (url: string, init: RequestInit): Promise<Unrestricted> => {
  const token = UserModel.currentUserValue.accessToken;

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
    throw new Error(e);
  }
};
