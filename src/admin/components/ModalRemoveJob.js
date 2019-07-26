import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../pages/RolesPage.css';
import { MdDelete } from 'react-icons/md';
export default class ModalRemoveJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  wrapperFunction = () => {
    this.props.function();
    this.toggle();
  };
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div style={{ width: 'auto' }}>
        <Button className="button-delete" onClick={this.toggle} color="danger">
          <MdDelete />
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Are you sure to delete this job ?
          </ModalHeader>
          <ModalBody>Name : {this.props.item.name}</ModalBody>
          <ModalBody>Posistion : {this.props.item.position}</ModalBody>
          <ModalBody>Salary : {this.props.item.salary}</ModalBody>
          <ModalBody>Published On : {this.props.item.publishedOn}</ModalBody>
          <ModalBody>Deadline : {this.props.item.deadline}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.wrapperFunction}>
              Yes, I'm sure
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
