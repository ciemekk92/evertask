import React from 'react';
import { Field, FieldAttributes } from 'formik';

interface Props {
  valid?: boolean;
  error?: boolean | '';
}

export const InputField = ({
  className,
  valid,
  error,
  ...props
}: FieldAttributes<Props>): JSX.Element => {
  return <Field className={className} {...props} />;
};
