import { TextInput, Textarea } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';

interface Prop {
  formField: FormFieldInterface;
  form: UseFormReturnTypeCustom;
}
const CrudTextArea = ({ formField, form, ...others }: Prop) => {
  return (
    <Textarea
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};

export default CrudTextArea;