import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import {  MdMap, MdBook, MdCancel,MdPageview } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import classnames from 'classnames';
import ModalRemoveRole from './interviewer/ModalDeleteInterviewer';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './JobDetail.css';
const cutStringSalary = (s, i) => {
  return s.substr(0, i);
};
const removeStringSalary = (s, i) => {
  return s.substr(i + 4);
};
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      name: '',
      address: '',
      status: '',
      timeEnd: '',
      timeStart: '',
      candidates: [],
      interviewers: [],
      loading: true,
    };
    // this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    var url = 'https://api.enclavei3dev.tk/api/interview/' + id;
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    
      setTimeout(() => {
        this.setState({
          name: data.name,
          address: data.address,
          status: data.status,
          timeEnd: data.timeEnd,
          timeStart: data.timeStart,
          candidates: data.candidates,
          interviewers: data.interviewers,
          loading: false
        });
      }, 500);
    }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  backToPreviousPage = () => {
    this.props.history.push('/dashboard/interview');
  };

  render() {
    var i = 0;
    const { formError } = this.state;
    return (
      <div className="profile-card">
        <Card className="card-body">
          <CardTitle className="title">
            <MdCancel className="first" />
            Interview Information
            <Link to="/dashboard/interview">
              <MdCancel />
            </Link>
          </CardTitle>
          {this.state.loading ? (
            <div
              style={{
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '100px'
              }}
              className="sweet-loading"
            >
              <ClipLoader
                sizeUnit={'px'}
                size={200}
                color={'#45b649'}
                loading={this.state.loading}
              />
            </div>
          ) : (
            <CardBody>
              <Container>
                <Row style={{ justifyContent: 'center' }}>
                  <div className="table-test" style={{ width: '100%' }}>
                    <table>
                      <tbody>
                        <tr key={1}>
                          <td className="job-title">Name</td>
                          <td>{this.state.name}</td>
                        </tr>
                        <tr key={2}>
                          <td className="job-title">Address</td>
                          <td>{this.state.address}</td>
                        </tr>
                        <tr key={3}>
                          <td className="job-title">Start</td>
                          <td>{this.state.timeStart}</td>
                        </tr>
                        
                        <tr key={4}>
                          <td className="job-title">End</td>
                          <td>{this.state.timeEnd}</td>
                        </tr>
                        <tr key={5}>
                          <td className="job-title">Status</td>
                          <td>{this.state.status}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Row>
                <br />
                <Row>
                  <div className="job-tabs">
                    <Nav tabs>
                      <NavItem style={{ width: '150px' }}>
                        <NavLink
                          className={classnames({
                            jobtabactive: this.state.activeTab === '1'
                          })}
                          onClick={() => {
                            this.toggle('1');
                          }}
                        >
                          <MdBook style={{ marginRight: '5px' }} />
                          Interviewers
                        </NavLink>
                      </NavItem>
                      <NavItem style={{ width: '150px' }}>
                        <NavLink
                          className={classnames({
                            jobtabactive: this.state.activeTab === '2'
                          })}
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          <MdMap style={{ marginRight: '5px' }} />
                          Candidates
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
                <br />
                <br />
                <Row>
                  <TabContent
                    style={{ width: '100%' }}
                    activeTab={this.state.activeTab}
                  >
                    <TabPane tabId="1">
                      <Row>
                      <CardBody>
                          <div className="table-test">
                            <table>
                              <thead>
                                <tr
                                  style={{
                                    background:
                                      '#45b649 linear-gradient(180deg, #61c164, #45b649) repeat-x',
                                    color: 'white'
                                  }}
                                >
                                  <th>#</th>
                                  <th>Fullname</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th style={{ width: '100px' }}>
                                    <div className="action">Action</div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.interviewers.map(e => {
                                  i++;
                                  let url = '/dashboard/interview/' + e.id;
                                  return (
                                    <tr key={e.id}>
                                      <td>{i}</td>
                                      <td>{e.fullname}</td>
                                      <td>{e.email}</td>
                                      <td>{e.phone}</td>
                                      <td>
                                        <div className="action">
                                          <Link style={{ width: 'auto' }} to={'/dashboard/candidate/'+ e.id}>
                                            <Button className="view-button" color="primary">
                                              <MdPageview />
                                            </Button>
                                          </Link>
                                          
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <br />

                          </div>
                        </CardBody>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>

                      <CardBody>
                          <div className="table-test">
                            <table>
                              <thead>
                                <tr
                                  style={{
                                    background:
                                      '#45b649 linear-gradient(180deg, #61c164, #45b649) repeat-x',
                                    color: 'white'
                                  }}
                                >
                                  <th>#</th>
                                  <th>Fullname</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Status</th>
                                  <th style={{ width: '100px' }}>
                                    <div className="action">Action</div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.candidates.map(e => {
                                    if(e.status == '1'){
                                      e.status = 'Pending';
                                  }
                                  if(e.status == '2'){
                                    e.status = 'Deny';
                                  }
                                  if(e.status == '3'){
                                    e.status = 'Approve Application';
                                  }
                                  if(e.status == '4'){
                                    e.status = 'Passed';
                                  }
                                  if(e.status == '5'){
                                    e.status = 'Failed';
                                  }
                                  i++;
                                  let url = '/dashboard/interview/' + e.id;
                                  return (
                                    <tr key={e.id}>
                                      <td>{i}</td>
                                      <td>{e.fullname}</td>
                                      <td>{e.email}</td>
                                      <td>{e.phone}</td>
                                      <td>{e.status}</td>
                                      <td>
                                        <div className="action">
                                          <Link style={{ width: 'auto' }} to={'/dashboard/candidate/'+ e.id}>
                                            <Button className="view-button" color="primary">
                                              <MdPageview />
                                            </Button>
                                          </Link>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <br />

                          </div>
                        </CardBody>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Row>
              </Container>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '20px'
                }}
              >
                <Button
                  onClick={() => this.backToPreviousPage()}
                  color="secondary"
                >
                  Back
                </Button>
              </div>
            </CardBody>
          )}
        </Card>
      </div>
    );
  }
}
