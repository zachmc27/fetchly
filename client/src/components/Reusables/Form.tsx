// renders children inside a form attribute so that
// the amount of input fields is variable
// passes a function prop to run onSubmit

// HOW TO CALL:
// const fields = [{name:"", label:"", type:""}]; 
// const handleSubmit = = (data: Record<string, string>) => {}
// <Form fields={fields} onSubmit={handleSubmit} />

import React from 'react';

// typing for form fields
type Field = {
  name: string;
  label: string;
  type: string;
};

type FormProps = {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  initialValues?: Record<string, string>;
};

export default function Form({ fields, onSubmit, initialValues = {} }: FormProps) {
  const [formData, setFormData] = React.useState<Record<string, string>>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

