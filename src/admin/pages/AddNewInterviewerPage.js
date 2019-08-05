import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Input,
  Col,
  Row
} from 'reactstrap';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import TechnicalSkill from '../components/TechnicalSkill';

const fullNameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export default class AddNewInterviewerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      phone: '',
      address: '',
      image: '',
      errorData: '',
      modalError: false,
      modalSuccess: false,
      showErrorMessage: false,
      amountTechnicalSkills: 1,
      formError: {
        fullname: 'Fullname is required',
        email: 'Email is required',
        phone: 'Phone is required'
      },
      arrayTechnicalSkillComponents: [
        <TechnicalSkill
          key={0}
          function={this.getDataTechnicalSkill.bind(this)}
          functionGetElement={this.removeTechnicalSkill.bind(this)}
          id={0}
          isDeleted={true}
        />
      ],
      urlInterviewer: '',
      dataTechnicalSkills: [],
      technicalSkill: '',
      skills: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.toggleModalSuccess = this.toggleModalSuccess.bind(this);
    this.handleErrorMessage = this.handleErrorMessage.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  componentDidUpdate() {}
  backToPreviousPage = () => {
    this.props.history.push('/dashboard/interviewer');
  };

  handleChange(event) {
    var { formError } = this.state;
    switch (event.target.name) {
      case 'fullname':
        if (event.target.value.length === 0) {
          formError.fullname = 'Full name is required';
        } else {
          fullNameRegex.test(event.target.value)
            ? (formError.fullname = '')
            : (formError.fullname =
                'Full name cannot contain the number/special characters');
        }
        break;
      case 'email':
        if (event.target.value.length === 0) {
          formError.email = 'Email is required';
        } else {
          emailRegex.test(event.target.value)
            ? (formError.email = '')
            : (formError.email = 'Invalid Email');
        }
        break;
      case 'phone':
        if (event.target.value.length === 0) {
          formError.phone = 'Phone number is required';
        } else if (event.target.value.length < 10) {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = 'Phone number must have at least 10 characters';
          }
        } else {
          if (isNaN(Number(event.target.value))) {
            formError.phone = 'Phone number cannot contain the letter';
          } else {
            formError.phone = '';
          }
        }
        break;
    }
    this.setState({
      [event.target.name]: event.target.value,
      formError: {
        fullname: formError.fullname,
        email: formError.email,
        phone: formError.phone
      }
    });
  }

  handleErrorMessage = () => {
    this.setState({
      showErrorMessage: true
    });
  };

  toggleModalSuccess() {
    this.setState(prevState => ({
      modalSuccess: !prevState.modalSuccess
    }));
  }
  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError
    }));
  }

  handleSubmit() {
    const { dataTechnicalSkills, fullname, email, phone, address } = this.state;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var arrayString = array.toString();
    var url = 'https://api.enclavei3dev.tk/api/interviewer';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        technicalSkill: arrayString
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        if (res.status === 401) {
          alert('Add Failed');
        }
        if (res.status === 422) {
          this.toggleModalError();
          res.json().then(data => {
            const dataArray = Object.keys(data.errors).map(i => data.errors[i]);
            this.setState({
              errorData: dataArray
            });
          });
        }
        if (res.status === 200) {
          this.toggleModalSuccess();
          res.json().then(data => {
            this.setState({
              urlInterviewer: '/dashboard/interviewer/' + data.interviewer.id
            });
          });
        }
      })
      .catch(error => console.error('Error:', error));
  }

  getDataTechnicalSkill(technicalskill, year, id) {
    var { dataTechnicalSkills } = this.state;

    if (technicalskill && year) {
      var tech = technicalskill.value + '-' + year;
      // dataTechnicalSkills.splice(id, 1);

      if (!dataTechnicalSkills[id]) {
        dataTechnicalSkills.push(tech);
      } else {
        dataTechnicalSkills[id] = tech;
      }
      // var array = dataTechnicalSkills
      //   .slice(0, id)
      //   .concat(tech.concat(dataTechnicalSkills.slice(id + 1)));
      // console.log(array);
      this.setState({
        dataTechnicalSkills: dataTechnicalSkills
      });
    }
  }

  removeTechnicalSkill(element, id) {
    var {
      dataTechnicalSkills,
      arrayTechnicalSkillComponents,
      amountTechnicalSkills
    } = this.state;
    dataTechnicalSkills.splice(id, 1, 0);
    element.remove();
    this.setState({
      dataTechnicalSkills: dataTechnicalSkills,
      arrayTechnicalSkillComponents: arrayTechnicalSkillComponents,
      amountTechnicalSkills: amountTechnicalSkills
    });
  }

  createTechnicalSkill = () => {
    var { amountTechnicalSkills, arrayTechnicalSkillComponents } = this.state;
    amountTechnicalSkills = amountTechnicalSkills + 1;
    arrayTechnicalSkillComponents = [];
    for (var j = 0; j < amountTechnicalSkills; j++) {
      arrayTechnicalSkillComponents.push(
        <TechnicalSkill
          key={j}
          function={this.getDataTechnicalSkill.bind(this)}
          functionGetElement={this.removeTechnicalSkill.bind(this)}
          id={j}
          isDeleted={true}
        />
      );
    }
    this.setState({
      amountTechnicalSkills: amountTechnicalSkills,
      arrayTechnicalSkillComponents: arrayTechnicalSkillComponents
    });
  };

  render() {
    var i = 0;
    const { dataTechnicalSkills, urlInterviewer, formError } = this.state;
    var array = [];
    dataTechnicalSkills.map(e => {
      if (typeof e == 'string') array.push(e);
      return array;
    });
    var errorTechnicalSkillMessage = '';
    array.length === 0
      ? (errorTechnicalSkillMessage = 'Technical skill is required')
      : (errorTechnicalSkillMessage = '');
    return (
      <div
        className="profile-card"
        style={{ marginBottom: '250px', width: '80%', marginTop: '3%' }}
      >
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalSuccess}>
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <Link to={urlInterviewer}>
              <span style={{ color: '#45b649' }}>
                Successfully! Click to see the detail of the new interviewer
              </span>
            </Link>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Success-----*/}

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalError}>
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.state.errorData !== undefined &&
                this.state.errorData.length !== 0 &&
                this.state.errorData.map(e => {
                  i++;
                  return (
                    <span key={i} style={{ color: 'red' }}>
                      {e[0]}
                    </span>
                  );
                })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}

        <Card className="card-body">
          <CardTitle className="title">
            <MdCancel className="first" />
            Create An New Interviewer
            <Link to="/dashboard/interviewer">
              <MdCancel />
            </Link>
          </CardTitle>
          <CardBody>
            <Form>
              <Row>
                <Col xs="4">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <img
                      src="/admin/img/Default-avatar.png"
                      style={{ width: '200px' }}
                    />
                    <br />
                    <Input
                      type="file"
                      name="image"
                      style={{ padding: '5px' }}
                      onChange={this.handleChange}
                    />
                  </div>
                </Col>
                <Col xs="8">
                  <FormGroup>
                    <Label className="title-input" for="exampleName">
                      Fullname
                    </Label>
                    <Input
                      type="text"
                      name="fullname"
                      onChange={this.handleChange}
                    />
                    {formError.fullname !== '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {formError.fullname}
                        </span>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="title-input" for="exampleDescription">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                    />
                    {formError.email !== '' && this.state.showErrorMessage && (
                      <span style={{ color: 'red' }}>{formError.email}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="title-input" for="exampleDescription">
                      Phone
                    </Label>
                    <Input
                      type="text"
                      name="phone"
                      onChange={this.handleChange}
                    />
                    {formError.phone !== '' && this.state.showErrorMessage && (
                      <span style={{ color: 'red' }}>{formError.phone}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="title-input" for="exampleDescription">
                      Address
                    </Label>
                    <Input
                      type="text"
                      name="address"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Label className="title-input" for="exampleDescription">
                        Technical skill{' '}
                        <Button
                          onClick={() => this.createTechnicalSkill()}
                          style={{
                            fontSize: '15px',
                            padding: '0px 6px',
                            marginLeft: '10px'
                          }}
                        >
                          +
                        </Button>
                      </Label>
                    </div>

                    {this.state.arrayTechnicalSkillComponents.map(e => e)}

                    {errorTechnicalSkillMessage != '' &&
                      this.state.showErrorMessage && (
                        <span style={{ color: 'red' }}>
                          {errorTechnicalSkillMessage}
                        </span>
                      )}
                  </FormGroup>
                </Col>
              </Row>

              <br />
              <FormGroup
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '180px',
                    justifyContent: 'space-between'
                  }}
                >
                  {errorTechnicalSkillMessage == '' &&
                  formError.fullname == '' &&
                  formError.phone == '' &&
                  formError.email == '' ? (
                    <Button color="success" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  ) : (
                    <Button color="success" onClick={this.handleErrorMessage}>
                      Submit
                    </Button>
                  )}
                  <Button
                    onClick={() => this.backToPreviousPage()}
                    color="secondary"
                  >
                    Back
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}