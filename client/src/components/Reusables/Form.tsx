// renders children inside a form attribute so that
// the amount of input fields is variable
// passes a function prop to run onSubmit

// HOW TO CALL:
// const fields = [{name:"", label:"", type:""}]; 
// const handleSubmit = = (data: Record<string, string>) => {}
// <Form fields={fields} onSubmit={handleSubmit} />

import React from 'react';
import "../../SammiReusables.css";

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
  buttonName?: string;
};

export default function Form({ fields, onSubmit, buttonName, initialValues = {} }: FormProps) {
  const [formData, setFormData] = React.useState<Record<string, string>>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submit triggered');
    onSubmit(formData);
  };

  return (
    <div >
    <form className="form-ctn" onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label className="profile-md-fnt" htmlFor={field.name}>{field.label}</label> <br/>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          /> 
          
        </div>
      ))}
      <button className="btn-fill btn-form" type="submit">{buttonName || 'Submit'}</button>
    </form>
    </div>
  );
}

