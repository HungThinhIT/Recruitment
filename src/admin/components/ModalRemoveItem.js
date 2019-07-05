import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../pages/RolesPage.css'
export default class ModalRemoveItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  wrapperFunction= () => {
    this.props.function();
    this.toggle();
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
       <Button color="danger" className='button-first' onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Are you sure to delete this role ?</ModalHeader>
          <ModalBody>
           Role : {this.props.item.role} 
          </ModalBody>
          <ModalBody>
           Permission : {this.props.item.permission}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.wrapperFunction}>Yes, I'm sure</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}