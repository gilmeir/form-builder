import React from 'react';
import { Redirect } from 'react-router';
import Card from 'wix-style-react/Card';
import Button from 'wix-style-react/Button';
import Add from 'wix-style-react/new-icons/Add';
import EmptyState from 'wix-style-react/EmptyState';
import NewFieldSelection from '../NewFieldSelection/NewFieldSelection';
import Text from 'wix-style-react/Text';
import { validateFieldParam } from './helpers';
import Form from '../Form/Form';
import * as routes from '../../routes/routes';
import styles from './FormBuilder.scss';
import FormNameSelection from '../FormNameSelection/FormNameSelection';

class FormBuilder extends React.Component {
  state = {
    formFields: [],
    formName: 'default name',
    showNewFieldSelection: false,
    saved: false,
    saveError: undefined,
    showNameSelectionModal: false,
  };

  showNewFieldSelection() {
    this.setState({
      showNewFieldSelection: true,
    });
  }

  toggleNameSelectionModal() {
    const { showNameSelectionModal } = this.state;

    this.setState({
      showNameSelectionModal: !showNameSelectionModal,
    })
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

  onSave(formName) {
    const { formFields } = this.state;
    const { saveForm } = this.props;

    const formData = {
      name: formName,
      fields: formFields,
    };

    saveForm(formData)
      .then(() => {
        this.setState({
          saved: true,
          showNameSelectionModal: false,
        })
      })
      .catch(() => {
        this.setState({
          saveError: 'Failed saving the form',
          showNameSelectionModal: false,
        })
      })

  }

  onDone() {
    this.setState({
      showNameSelectionModal: true,
      saveError: undefined,
    })
  }

  render() {
    const {
      formFields,
      showNewFieldSelection,
      saved,
      saveError,
      showNameSelectionModal,
    } = this.state;

    if (saved) {
      return <Redirect to={routes.list}/>
    }

    return (
      <div>
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
                    <div className={styles.formFooter}>
                      <Button onClick={() => this.onDone()}>
                        Done
                      </Button>

                      <Text
                        skin="error"
                        tagName="div"
                      >
                        { saveError }
                      </Text>

                    </div>
                  </div>
            }
          </Card.Content>
        </Card>

        <FormNameSelection
          show={showNameSelectionModal}
          onSave={name => this.onSave(name)}
        />
      </div>
    );
  }
}

export default FormBuilder;
