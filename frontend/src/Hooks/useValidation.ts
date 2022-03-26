import React from 'react';

export const useValidation = () => {
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map());

  const resetValidationState = () => setErrors(new Map());

  const removeError = (key: string) => {
    let updatedErrors = errors;
    updatedErrors.delete(key);
    setErrors(updatedErrors);
  };

  const saveErrors = (errorArr: string[]): void => {
    let errorMap = new Map<string, string>();
    errorArr.forEach((err: string) => {
      const [key, value] = err.split(': ');

      errorMap.set(key, value);
    });

    setErrors(errorMap);
  };

  return {
    errors,
    saveErrors,
    removeError,
    resetValidationState
  };
};
