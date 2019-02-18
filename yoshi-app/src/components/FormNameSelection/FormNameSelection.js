import React from 'react';
import propTypes from 'prop-types';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Input from 'wix-style-react/Input';

class FormNameSelection extends React.Component {
  state = {
    name: '',
  };

  render() {
    const {
      onSave,
      onCancel,
      show,
    } = this.props;
    const { name } = this.state;

    return (
      <Modal
        isOpen={show}
        shouldCloseOnOverlayClick={false}
      >
        <MessageBoxFunctionalLayout
          title="Give This Form a Name"
          confirmText="Save"
          cancelText="Cancel"
          onOk={() => onSave(name)}
          onCancel={onCancel}
          onRequestClose={() => this.toggleNameSelectionModal()}
        >
          <Input
            type="text"
            onChange={e => this.setState({name: e.target.value})}
            value={name}
            autoFocus
          />
        </MessageBoxFunctionalLayout>
      </Modal>
    );
  }
}

FormNameSelection.propTypes = {
  show: propTypes.bool,
  onSave: propTypes.func,
  onCancel: propTypes.func,
};

export default FormNameSelection;
