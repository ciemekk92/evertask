import React from 'react';

export const useValidation = () => {
  const [validationErrors, setValidationErrors] = React.useState<Map<string, string>>(new Map());

  const resetValidationState = () => setValidationErrors(new Map());

  const removeError = (key: string) => {
    let updatedErrors = validationErrors;
    updatedErrors.delete(key);
    setValidationErrors(updatedErrors);
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

    setValidationErrors(errorMap);
  }, []);

  return {
    validationErrors,
    saveErrors,
    removeError,
    resetValidationState
  };
};
