import React from 'react';
import { Field, FieldAttributes } from 'formik';

interface FormikRadioProps {
  valid?: boolean;
  error?: boolean | '';
}

export const FormikRadioField = ({
  className,
  name,
  value,
  ...props
}: FieldAttributes<FormikRadioProps>): JSX.Element => (
  <Field type="radio" className={className} name={name} value={value} {...props} />
);
