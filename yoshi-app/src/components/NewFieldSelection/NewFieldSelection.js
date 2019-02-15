import React from 'react';
import Input from 'wix-style-react/Input';
import Dropdown from 'wix-style-react/Dropdown';
import Button from 'wix-style-react/Button';
import Heading from 'wix-style-react/Heading';
import FormField from 'wix-style-react/FormField';
import styles from './NewFieldSelection.scss';

class NewFieldSelection extends React.Component {
  state = {
    label: {
      value: '',
      error: undefined,
    },
    name: {
      value: '',
      error: undefined,
    },
    type: {
      value: fieldTypes[0],
      error: undefined,
    },
  };

  updateParam(paramName, paramValue) {
    const { isValidFieldParam } = this.props;

    const error = isValidFieldParam(paramName, paramValue);

    this.setState({
      [paramName]: {
        value: paramValue,
        error,
      }
    })
  }

  getParamsErrors() {
    const { isValidFieldParam } = this.props;
    const params = this.state;

    return Object.keys(params).reduce(
      (paramsErrors, fieldName) => ({
        ...paramsErrors,
        [fieldName]: isValidFieldParam(fieldName, params[fieldName].value)
      }),
      {},
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const params = this.state;
    const paramsErrors = this.getParamsErrors();
    const hasErrors = Object.keys(paramsErrors).some(e => paramsErrors[e]);

    if (hasErrors) {
      const stateWithNewErrors = updateErrorsInParams(params, paramsErrors);
      this.setState(stateWithNewErrors);
    } else {
      const paramsValues = getParamsValues(params);
      this.props.onAdd(paramsValues);
    }
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    const { label, name, type } = this.state;

    return (
      <div style={{border: '0.5px solid gray', borderRadius: '20px', padding: '25px'}}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div style={{marginBottom: 10}}>
            <Heading appearance="H4">
              Fill in the field details:
            </Heading>
          </div>

          <FormField
            label="Label"
          >
            <Input
              type="text"
              tabIndex={1}
              onChange={e => this.updateParam('label', e.target.value.trim())}
              status={label.error && 'error'}
              statusMessage={label.error}
              value={label.value}
              autoFocus
              className={styles.input}
            />
          </FormField>

          <FormField
            label="Name"
          >
            <Input
              type="text"
              tabIndex={2}
              onChange={e => this.updateParam('name', e.target.value.trim())}
              status={name.error && 'error'}
              statusMessage={name.error}
              value={name.value}
              className={styles.input}
            />
          </FormField>

          <FormField label="Type">
            <Dropdown
              tabIndex={3}
              options={fieldTypesOptions}
              onSelect={option => this.updateParam('type', option.id)}
              selectedId={(fieldTypesOptions.filter(fieldType => fieldType.id === type.value).pop() || {}).id}
            />
          </FormField>

          <div className={styles.buttonsContainer}>
            <Button
              type="submit"
              tabIndex={4}
            >
              Add
            </Button>
            <Button
              onClick={() => this.handleCancel()}
              tabIndex={5}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
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

const getParamsValues = params =>
  Object.keys(params).reduce((acc, paramName) => ({
    ...acc,
    [paramName]: params[paramName].value,
  }), {});

export default NewFieldSelection;
