import React from 'react';
import { Redirect } from 'react-router';
import Card from 'wix-style-react/Card';
import Button from 'wix-style-react/Button';
import Add from 'wix-style-react/new-icons/Add';
import EmptyState from 'wix-style-react/EmptyState';
import NewFieldSelection from '../NewFieldSelection/NewFieldSelection';
import { validateFieldParam } from './helpers';
import Form from '../Form/Form';
import * as routes from '../../routes/routes';
import styles from './FormBuilder.scss';

class FormBuilder extends React.Component {
  state = {
    formFields: [],
    showNewFieldSelection: false,
    saved: false,
    saveError: undefined,
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

  onDone() {
    const { formFields } = this.state;
    const { saveForm } = this.props;

    saveForm(formFields)
      .then(() => {
        this.setState({
          saved: true,
        })
      })
      .catch(() => {
        this.setState({
          saveError: 'Failed saving the form'
        })
      })

  }

  render() {
    const {
      formFields,
      showNewFieldSelection,
      saved,
      saveError,
    } = this.state;

    if (saved) {
      return <Redirect to={routes.list}/>
    }

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
                  <div className={styles.formFooter}>
                    <Button onClick={() => this.onDone()}>
                      Done
                    </Button>

                    { saveError }

                  </div>
                </div>
          }
        </Card.Content>
      </Card>
    );
  }
}

export default FormBuilder;
