export const customFetch = async (url: string, init: RequestInit): Promise<Unrestricted> => {
  try {
    return await fetch(url, init);
  } catch (e: any) {
    throw new Error(e);
  }
};
