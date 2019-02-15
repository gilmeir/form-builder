import React from 'react';
import Card from 'wix-style-react/Card';
import Button from 'wix-style-react/Button';
import Add from 'wix-style-react/new-icons/Add';
import EmptyState from 'wix-style-react/EmptyState';
import Input from 'wix-style-react/Input';
import Label from 'wix-style-react/Label';
import NewFieldSelection from '../NewFieldSelection/NewFieldSelection';
import { validateFieldParam } from './helpers';

class FormBuilder extends React.Component {
  state = {
    formFields: [],
    showNewFieldSelection: false,
  };

  showNewFieldSelection() {
    this.setState({
      showNewFieldSelection: true,
    });
  }

  hasErrors() {
    const { formFields } = this.state;
    return formFields.filter(field => field.error).length > 0;
  }

  addField(field) {
    const { formFields } = this.state;

    const hasErrors = this.hasErrors();

    if (!hasErrors) {
      this.setState({
        formFields: [
          ...formFields,
          field
        ],
        showNewFieldSelection: false,
      })
    }
  }

  isValidFieldParam(paramName, paramValue) {
    const { formFields } = this.state;

    switch(paramName) {
      case 'name':
        return validateFieldParam({
          paramName,
          paramValue,
          shouldBeUnique: true,
          existingFields: formFields,
        });
      case 'label':
        return validateFieldParam({
          paramName,
          paramValue,
          shouldBeUnique: true,
          existingFields: formFields,
        });
      case 'type':
        return validateFieldParam({
          paramName,
          paramValue,
          shouldBeUnique: false,
        });
      default:
        throw new Error('Invalid field');
    }
  };

  renderFields() {
    const { formFields } = this.state;

    return (
      <div style={{marginBottom: '15px'}}>
        {
          formFields.map(({type, name, label}) => {
            const inputId = generateInputId({type, name, label});
            return (
              <div key={inputId}>
                <Label>
                  {label}
                </Label>
                <Input
                  id={inputId}
                  type={type}
                  name={name}
                  readonly
                  disabled
                />
              </div>
            );
          })
        }
      </div>
    )
  }

  hideNewFieldSelection() {
    this.setState({showNewFieldSelection: false});
  }

  render() {
    const {
      formFields,
      showNewFieldSelection,
    } = this.state;

    return (
      <Card>
        <Card.Header
          title='Build Your Form'
          suffix={
            <Button
              tabIndex={0}
              size="medium"
              prefixIcon={<Add />}
              onClick={() => this.showNewFieldSelection()}
            >
              New Field
            </Button>
          }
        />

        <Card.Content>
          {
            showNewFieldSelection &&
            <div style={{marginBottom: '15px'}}>
              <NewFieldSelection
                onAdd={field => this.addField(field)}
                onCancel={() => this.hideNewFieldSelection()}
                isValidFieldParam={(name, value) => this.isValidFieldParam(name, value)}
                hasErrors={this.hasErrors()}
              />
            </div>
          }

          {
            formFields.length === 0
              ? (
                !showNewFieldSelection &&
                <EmptyState
                  title={"You haven't added any fields yet"}
                  subtitle={"Add fields to your form easily by hitting the Add button"}
                />
              )
              : <div style={{marginBottom: 15}}>
                  { this.renderFields() }
                </div>
          }
        </Card.Content>
      </Card>
    );
  }
}

const generateInputId = ({name, label, type}) => `${name}-${label}-${type}`;

export default FormBuilder;
