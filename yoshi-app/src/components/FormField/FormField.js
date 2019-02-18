import React from 'react';
import Label from 'wix-style-react/Label';

class FormField extends React.Component {
  state = {
    error: undefined,
  };

  changeCallbackWithValidation(args, inputChangeCallback) {
    const { validator } = this.props;

    const error = validator && validator(...args);
    this.setState({error});

    return inputChangeCallback(...args);
  }

  render() {
    const {
      label,
      children,
      changeCallback = 'onChange',
      } = this.props;
    const { error } = this.state;

    const inputElement = React.Children.only(children);
    const inputChangeCallback = inputElement.props[changeCallback];

    const props = {
      ...inputElement.props,
      [changeCallback]: inputChangeCallback ? (...args) => this.changeCallbackWithValidation(args, inputChangeCallback) : inputChangeCallback,
    };

    if (error) {
      props.status = 'error';
      props.statusMessage = error;
    }

    return (
      <Label>
        {label}
        {inputChangeCallback ? React.cloneElement(inputElement, props) : inputElement}
      </Label>
    );
  }
};

export default FormField;
