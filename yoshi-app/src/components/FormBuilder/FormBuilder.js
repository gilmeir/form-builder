import React from 'react';
import Card from 'wix-style-react/Card';
import Button from 'wix-style-react/Button';
import Add from 'wix-style-react/new-icons/Add';
import EmptyState from 'wix-style-react/EmptyState';
import NewFieldSelection from '../NewFieldSelection/NewFieldSelection';
import { validateFieldParam } from './helpers';
import Form from '../Form/Form';

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

  addField(field) {
    const { formFields } = this.state;

    this.setState({
      formFields: [
        ...formFields,
        field
      ],
      showNewFieldSelection: false,
    })
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
          title='Add Fields To Your Form'
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
              />
            </div>
          }

          {
            formFields.length === 0
              ? (
                !showNewFieldSelection &&
                <EmptyState
                  title={"You haven't added any fields yet"}
                  subtitle={"Add fields to your form easily by hitting the New Field button"}
                />
              )
              : <div style={{marginBottom: 15}}>
                  <Form fields={formFields}/>
                </div>
          }
        </Card.Content>
      </Card>
    );
  }
}

export default FormBuilder;
