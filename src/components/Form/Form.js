import React from 'react';
import propTypes from 'prop-types';
import Input from 'wix-style-react/Input';
import FormField from '../FormField/FormField';
import Box from 'wix-style-react/Box';
import Button from 'wix-style-react/Button';
import styles from './Form.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import { captchaSiteKey } from './helpers';

class Form extends React.Component {
  state = {
    values: {},
    captchaVerified: false,
  };

  handleSubmit(e) {
    e.preventDefault();

    const {
      onSubmit,
      formId,
      useCaptcha,
    } = this.props;

    const {
      values,
      captchaVerified,
    } = this.state;

    if (!useCaptcha) {
      onSubmit(formId, values);
    } else if (useCaptcha && captchaVerified) {
      const captchaToken = this.recaptchaRef.getValue();
      onSubmit(formId, values, captchaToken);
    }
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

  onCaptchaSuccess = () => {
    this.setState({captchaVerified: true});
  };

  render() {
    const {
      fields,
      useCaptcha,
    } = this.props;

    return (
      <Box width="100%">
        <form onSubmit={e => this.handleSubmit(e)} style={{width: '100%'}}>
          {
            fields.map(({type, name, label}, i) => {
              return <div className={styles.formField} key={i}>
                <FormField label={label}>
                  <Input
                    autoFocus={i === 0}
                    tabIndex={i + 1}
                    type={type}
                    name={name}
                    onChange={e => this.updateValue(name, e.target.value)}
                  />
                </FormField>
              </div>
            })
          }

          {
            useCaptcha && this.shouldShowSubmitButton() &&
              <ReCAPTCHA
                sitekey={captchaSiteKey}
                onChange={this.onCaptchaSuccess}
                ref={element => this.recaptchaRef = element}
              />
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
  useCaptcha: false,
};

Form.propTypes = {
  useCaptcha: propTypes.bool,
  onSubmit: propTypes.func,
  formId: propTypes.string,
  fields: propTypes.arrayOf(
    propTypes.shape({
      type: propTypes.string.required,
      name: propTypes.string.required,
      label: propTypes.string.required,
    })
  ),
};

export default Form;
