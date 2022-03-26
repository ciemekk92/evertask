export const customFetch = async (url: string, init: RequestInit): Promise<Unrestricted> => {
  try {
    return await fetch(`http://localhost:8080/api/${url}`, init);
  } catch (e: any) {
    throw new Error(e);
  }
};
