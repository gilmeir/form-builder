import React from 'react';
import Card from 'wix-style-react/Card';
import Button from 'wix-style-react/Button';
import Add from 'wix-style-react/new-icons/Add';
import EmptyState from 'wix-style-react/EmptyState';
import Input from 'wix-style-react/Input';
import Label from 'wix-style-react/Label';
import NewFieldSelection from '../NewFieldSelection/NewFieldSelection';

class FormBuilder extends React.Component {
  state = {
    formFields: [
      {
        name: 'field-name',
        label: 'field-label',
        type: 'text',
      },
    ],
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
      showNewFieldSelection: true,
    })
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
              size="medium"
              prefixIcon={<Add />}
              onClick={() => this.showNewFieldSelection()}
            >
              Add
            </Button>
          }
        />

        <Card.Content>
          {
            formFields.length === 0
              ? <EmptyState
                title={"You haven't added any fields yet"}
                subtitle={"Add fields to your form easily by hitting the Add button"}
                />
              : formFields.map(({type, name, label}, i) => {
                  const inputId = generateInputId({type, name, label});
                  return (
                    <div>
                      <Label for={inputId}>
                        {label}
                      </Label>
                      <Input
                        id={inputId}
                        type={type}
                        name={name}
                        tabIndex={i}
                        readonly
                      />
                    </div>
                  );
              })
          }
          {
            showNewFieldSelection &&
              <NewFieldSelection
                onAdd={this.addField}
              />
          }
        </Card.Content>
      </Card>
    );
  }
}

const generateInputId = ({name, label, type}) => `${name}-${label}-${type}`;

export default FormBuilder;
