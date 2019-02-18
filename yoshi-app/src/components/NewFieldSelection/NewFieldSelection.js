import React from 'react';
import propTypes from 'prop-types';
import Input from 'wix-style-react/Input';
import Dropdown from 'wix-style-react/Dropdown';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import styles from './NewFieldSelection.scss';
import FormField from '../FormField/FormField';

class NewFieldSelection extends React.Component {
  state = {
    label: '',
    name: '',
    type: fieldTypes[0],
  };

  updateParam(paramName, paramValue) {
    this.setState({
      [paramName]: paramValue,
    });
  }

  getParamsErrors() {
    const { isValidFieldParam } = this.props;
    const params = this.state;

    return Object.keys(params).reduce(
      (paramsErrors, fieldName) => ({
        ...paramsErrors,
        [fieldName]: isValidFieldParam(fieldName, params[fieldName])
      }),
      {},
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const params = this.state;
    const paramsErrors = this.getParamsErrors();
    const hasErrors = Object.values(paramsErrors).some(e => e);

    if (hasErrors) {
      const stateWithNewErrors = updateErrorsInParams(params, paramsErrors);
      this.setState(stateWithNewErrors);
    } else {
      const fieldsParams = this.state;
      this.props.onAdd(fieldsParams);
    }
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    const { isValidFieldParam } = this.props;
    const { label, name, type } = this.state;

    return (
      <Modal
        isOpen={true}
        shouldCloseOnOverlayClick={false}
      >
        <MessageBoxFunctionalLayout
          title="Fill in the field details"
          confirmText="Add"
          cancelText="Cancel"
          onCancel={() => this.handleCancel()}
          onOk={(e) => this.handleSubmit(e)}
        >
          <form onSubmit={e => this.handleSubmit(e)}>
            <FormField
              label="Label"
              validator={e => isValidFieldParam('label', e.target.value)}
            >
              <Input
                type="text"
                onChange={e => this.updateParam('label', e.target.value)}
                value={label}
                autoFocus
                className={styles.input}
              />
            </FormField>

            <FormField
              label="Name"
              validator={e => isValidFieldParam('name', e.target.value)}
            >
              <Input
                type="text"
                onChange={e => this.updateParam('name', e.target.value)}
                value={name}
                className={styles.input}
              />
            </FormField>

            <FormField
              label="Type"
            >
              <Dropdown
                options={fieldTypesOptions}
                onSelect={option => this.updateParam('type', option.id)}
                selectedId={(fieldTypesOptions.filter(fieldType => fieldType.id === type).pop() || {}).id}
              />
            </FormField>
          </form>
        </MessageBoxFunctionalLayout>
      </Modal>
    )
  }
}

const fieldTypes = [
  'text',
  'color',
  'date',
  'email',
  'tel',
  'number',
];

const fieldTypesOptions = fieldTypes.map(fieldType => ({
  id: fieldType,
  value: fieldType,
}));

const updateErrorsInParams = (params, paramsErrors) =>
  Object.keys(paramsErrors).reduce(
    (acc, paramName) => ({
      ...acc,
      [paramName]: {
        ...params[paramName],
        error: paramsErrors[paramName],
      }
    }), {});

NewFieldSelection.propTypes = {
  isValidFieldParam: propTypes.func,
  onAdd: propTypes.func,
  onCancel: propTypes.func,
};

export default NewFieldSelection;
