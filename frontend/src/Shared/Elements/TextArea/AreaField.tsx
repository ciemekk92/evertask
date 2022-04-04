import React from 'react';
import { Field, FieldAttributes } from 'formik';

interface Props {
  valid?: boolean;
  error?: boolean | '';
}

export const AreaField = ({
  className,
  valid,
  error,
  ...props
}: FieldAttributes<Props>): JSX.Element => {
  return <Field as="textarea" className={className} {...props} />;
};
