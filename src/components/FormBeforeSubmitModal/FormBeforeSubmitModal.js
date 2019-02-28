import React from 'react';
import propTypes from 'prop-types';
import Modal from 'wix-style-react/Modal';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Input from 'wix-style-react/Input';
import Checkbox from 'wix-style-react/Checkbox';

class FormBeforeSubmitModal extends React.Component {
  state = {
    name: '',
    captchaSelected: false,
  };

  onCaptchaToggle = () => {
    this.setState(({captchaSelected}) => ({captchaSelected: !captchaSelected}))
  };

  render() {
    const {
      onSave,
      onCancel,
      show,
    } = this.props;

    const {
      name,
      captchaSelected,
    } = this.state;

    return (
      <Modal
        isOpen={show}
        shouldCloseOnOverlayClick={false}
      >
        <MessageBoxFunctionalLayout
          title="Give This Form a Name"
          confirmText="Save"
          cancelText="Cancel"
          onOk={() => onSave(name, captchaSelected)}
          onCancel={onCancel}
          onRequestClose={() => this.toggleNameSelectionModal()}
        >
          <Input
            type="text"
            onChange={e => this.setState({name: e.target.value})}
            value={name}
            autoFocus
          />
          <Checkbox checked={captchaSelected} onChange={this.onCaptchaToggle} style={{marginTop: 10}}>
            Use Captcha
          </Checkbox>
        </MessageBoxFunctionalLayout>
      </Modal>
    );
  }
}

FormBeforeSubmitModal.propTypes = {
  show: propTypes.bool,
  onSave: propTypes.func,
  onCancel: propTypes.func,
};

export default FormBeforeSubmitModal;
