import React from 'react';

export const useValidation = () => {
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map());

  const resetValidationState = () => setErrors(new Map());

  const removeError = (key: string) => {
    let updatedErrors = errors;
    updatedErrors.delete(key);
    setErrors(updatedErrors);
  };

  const saveErrors = React.useCallback((errorsCollection: string[] | string): void => {
    let errorMap = new Map<string, string>();

    if (Array.isArray(errorsCollection)) {
      errorsCollection.forEach((err: string) => {
        const [key, value] = err.split(': ');

        errorMap.set(key, value);
      });
    } else {
      errorMap.set('message', errorsCollection);
    }

    setErrors(errorMap);
  }, []);

  return {
    errors,
    saveErrors,
    removeError,
    resetValidationState
  };
};
