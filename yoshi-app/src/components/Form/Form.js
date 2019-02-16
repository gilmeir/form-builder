import React from 'react';
import Input from 'wix-style-react/Input';
import Label from 'wix-style-react/Label';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';
import styles from './Form.scss';
import { Redirect } from 'react-router';

class Form extends React.Component {
  state = {
    submitted: false,
  };

  handleSubmit(e) {
    e.preventDefault();

    const {
      onSubmit,
      formId,
    } = this.props;
    const fields = this.state;

    const fieldsValues = getFieldsValues(fields);

    onSubmit && onSubmit(formId, fieldsValues)
      .then(() => this.setState({
        submitted: true,
      }));
  }

  shouldShowSubmitButton() {
    const {
      fields,
      onSubmit,
    } = this.props;

    return fields.length > 0 && onSubmit !== undefined;
  }

  updateValue(paramName, paramValue) {
    //const { isValidFieldParam } = this.props;

    //const error = isValidFieldParam(paramName, paramValue);

    this.setState({
      [paramName]: {
        value: paramValue,
        //error,
      }
    })
  }

  render() {
    const {
      fields,
      onSubmitSuccessRedirectTo,
    } = this.props;

    const { submitted } = this.state;

    if (onSubmitSuccessRedirectTo && submitted) {
      return <Redirect to={onSubmitSuccessRedirectTo}/>
    }

    return (
      <Box width="100%">
        <form style={{width: '100%'}}>
          {
            fields.map(({type, name, label}) => (
              <div className={styles.formField} key={generateFieldKey({type, name, label})}>
                <Label>
                  {label}
                </Label>

                <Input
                  type={type}
                  name={name}
                  onChange={e => this.updateValue(name, e.target.value)}
                />
              </div>
            ))
          }
          {
            this.shouldShowSubmitButton() && (
              <Box align="center" marginTop="15px">
                <Button
                  type="submit"
                  onClick={e => this.handleSubmit(e)}
                >
                  Submit
                </Button>
              </Box>
            )
          }
        </form>
      </Box>
    );
  }
}

const generateFieldKey = ({name, label, type}) => `${name}-${label}-${type}`;

const getFieldsValues = params =>
  Object.keys(params).reduce((acc, paramName) => ({
    ...acc,
    [paramName]: params[paramName].value,
  }), {});

export default Form;
