import React from 'react';
import { Field, FieldAttributes } from 'formik';

interface Props {
  valid?: boolean;
  error?: boolean | '';
}

export const DateField = ({
  className,
  valid,
  error,
  type,
  ...props
}: FieldAttributes<Props>): JSX.Element => {
  return <Field type="date" className={className} {...props} />;
};
