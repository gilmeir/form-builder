import React from 'react';
import Input from 'wix-style-react/Input';
import Label from 'wix-style-react/Label';
import styles from './Form.scss';

const Form = ({fields, onSubmit}) => (
  <div>
    <form onSubmit={onSubmit}>
      {
        fields.map(({type, name, label}) => (
          <div className={styles.formField} key={generateFieldKey({type, name, label})}>
            <Label>
              {label}
            </Label>

            <Input
              type={type}
              name={name}
            />
          </div>
        ))
      }
    </form>
  </div>
);

const generateFieldKey = ({name, label, type}) => `${name}-${label}-${type}`;

export default Form;
