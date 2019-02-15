import React from 'react';
import Input from 'wix-style-react/Input';
import Dropdown from 'wix-style-react/Dropdown';
import Button from 'wix-style-react/Button';
import Heading from 'wix-style-react/Heading';
import FormField from 'wix-style-react/FormField';
import styles from './NewFieldSelection.scss';

class NewFieldSelection extends React.Component {
  state = getInitialState();

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

  handleSubmit(e) {
    e.preventDefault();

    const { type, name, label } = this.state;

    this.props.onAdd({
      type: type.value,
      name: name.value,
      label: label.value,
    });
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    const { label, name, type } = this.state;
    const { hasErrors } = this.props;

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
              disabled={hasErrors}
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

const getInitialState = () => {
  return {
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
};

export default NewFieldSelection;
