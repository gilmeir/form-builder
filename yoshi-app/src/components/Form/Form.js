import React from 'react';
import Input from 'wix-style-react/Input';
import FormField from '../FormField/FormField';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';
import styles from './Form.scss';

class Form extends React.Component {
  state = {
    values: {},
  };

  handleSubmit(e) {
    e.preventDefault();

    const {
      onSubmit,
      formId,
    } = this.props;
    const { values } = this.state;

    return onSubmit(formId, values);
  }

  shouldShowSubmitButton() {
    const {
      fields,
      onSubmit,
    } = this.props;

    return fields.length > 0 && onSubmit !== undefined;
  }

  updateValue(paramName, paramValue) {
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        [paramName]: paramValue,
      }
    });
  }

  render() {
    const { fields } = this.props;

    return (
      <Box width="100%">
        <form onSubmit={e => this.handleSubmit(e)} style={{width: '100%'}}>
          {
            fields.map(({type, name, label}, i) => (
              <div className={styles.formField} key={i}>
                <FormField label={label}>
                  <Input
                    tabIndex={i}
                    type={type}
                    name={name}
                    onChange={e => this.updateValue(name, e.target.value)}
                  />
                </FormField>
              </div>
            ))
          }
          {
            this.shouldShowSubmitButton() && (
              <Box align="center" marginTop="15px">
                <Button type="submit">
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

Form.defaultProps = {
  fields: [],
};

export default Form;
