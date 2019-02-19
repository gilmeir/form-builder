import React from 'react';
import propTypes from 'prop-types';
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
      onChangeCallbackName,
      } = this.props;
    const { error } = this.state;

    const inputNode = React.Children.only(children);
    const inputNodeOnChangeCallback = inputNode.props[onChangeCallbackName];

    const props = {
      ...inputNode.props,
      [onChangeCallbackName]: inputNodeOnChangeCallback ? (...args) => this.changeCallbackWithValidation(args, inputNodeOnChangeCallback) : inputNodeOnChangeCallback,
    };

    if (error) {
      props.status = 'error';
      props.statusMessage = error;
    }

    return (
      <Label>
        {label}
        {inputNodeOnChangeCallback ? React.cloneElement(inputNode, props) : inputNode}
      </Label>
    );
  }
}

FormField.defaultProps = {
  onChangeCallbackName: 'onChange',
};

FormField.propTypes = {
  validator: propTypes.func,
  label: propTypes.string,
  children: propTypes.node,
  onChangeCallbackName: propTypes.string,
};

export default FormField;
