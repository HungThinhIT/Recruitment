import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Label,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PaginationComponent from '../../components/Pagination.js';
import { PulseLoader } from 'react-spinners';
import DropDownTable from '../../components/DropDownTable.js';
import ModalRemoveItem from '../../components/ModalRemoveItem';
import ModalEditInterviewer from '../../components/ModalEditInterviewer';

export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDeleteName: [],
      listDeleteId: [],
      rows: [],
      currentPage: 0,
      activePage: 1,
      totalItems: 0,
      loading: true,
      modalDeleteError: false,
      modalDeleteSuccess: false,
      selectPerPage: '10',
      loadData: false,
      keyword: '',
      perPage: 10
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.toggleModalDeleteError = this.toggleModalDeleteError.bind(this);
    this.toggleModalDeleteSuccess = this.toggleModalDeleteSuccess.bind(this);
    this.handleChangePerPage = this.handleChangePerPage.bind(this);
    this.handleChangeKeyWord = this.handleChangeKeyWord.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }

  async componentDidMount(perPage, keyword) {
    const { activePage } = this.state;
    if (!perPage) perPage = 10;
    var body = '';
    var url = '';
    if (keyword != '') {
      body = {
        keyword: keyword
      };
      url = 'https://enclave-recruitment-management.herokuapp.com/api/list-interviewer';
    } else {
      body = '';
      url =
        'https://enclave-recruitment-management.herokuapp.com/api/list-interviewer?page=' +
        activePage +
        '&perpage=' +
        perPage;
    }
    const data = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        rows: data.data,
        totalItems: data.total,
        loading: false,
        perPage: parseInt(data.per_page),
        loadData: false,
        activePage: data.current_page
      });
    }, 500);
  }

  getUpdate(update) {
    const { perPage, keyword } = this.state;
    if ((update = true)) {
      this.componentDidMount(perPage, keyword);
    }
  }

  toggleModalDeleteSuccess() {
    this.setState(prevState => ({
      modalDeleteSuccess: !prevState.modalDeleteSuccess
    }));
  }
  toggleModalDeleteError() {
    this.setState(prevState => ({
      modalDeleteError: !prevState.modalDeleteError
    }));
  }

  handlePageChange(pageNumber) {
    const { perPage, keyword } = this.state;
    var url = '';
    var body = '';
    if (keyword != '') {
      body = {
        keyword: keyword
      };
      url = 'https://enclave-recruitment-management.herokuapp.com/api/list-interviewer';
    } else {
      body = '';
      url =
        'https://enclave-recruitment-management.herokuapp.com/api/list-interviewer?page=' +
        pageNumber +
        '&perpage=' +
        perPage;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      res.json().then(data => {
        this.setState({
          currentPage: data.currentPage,
          totalItems: data.total,
          rows: data.data,
          activePage: pageNumber,
          perPage: parseInt(data.per_page)
        });
      });
    });
  }

  removeItem(id) {
    const { perPage, keyword } = this.state;
    var array = [];
    array.push(id);
    var url = 'https://enclave-recruitment-management.herokuapp.com/api/interviewer';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        interviewerId: array,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      if (res.status == 200) {
        this.toggleModalDeleteSuccess();
        this.componentDidMount(perPage, keyword);
      } else {
        this.toggleModalDeleteError();
      }
    });
  }
  handleCheckChange(e) {
    const { listDeleteId, listDeleteName } = this.state;
    listDeleteId.push(e.id);
    listDeleteName.push(e);
    var array1 = [...new Set(listDeleteId)];
    var array3 = [...new Set(listDeleteName)];
    var array2 = [];
    var array4 = [];
    array1.map(element => {
      var count = listDeleteId.filter(e => e === element);
      var length = count.length;
      if (length % 2 !== 0) {
        array2.push(element);
      }
      return array2;
    });
    array3.map(element => {
      var count = listDeleteName.filter(e => e.id === element.id);
      var length = count.length;
      if (length % 2 !== 0) {
        array4.push(element);
      }
      return array4;
    });
    this.setState({
      listDeleteId: array2,
      listDeleteName: array4
    });
  }
  removeManyItems() {
    const { listDeleteId, perPage, keyword } = this.state;
    var url = 'https://enclave-recruitment-management.herokuapp.com/api/interviewer';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        interviewerId: listDeleteId,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      if (res.status == 200) {
        this.toggleModalDeleteSuccess();
        this.componentDidMount(perPage, keyword);
        this.setState({
          listDeleteId: [],
          listDeleteName: []
        });
      } else {
        this.toggleModalDeleteError();
      }
    });
  }

  handleChangePerPage = e => {
    const { keyword } = this.state;
    var perPage = 0;
    switch (e.target.value) {
      case '10':
        perPage = 10;
        break;
      case '20':
        perPage = 20;
        break;
      case '50':
        perPage = 50;
        break;
      case '100':
        perPage = 100;
        break;
    }
    this.setState({
      perPage: perPage,
      [e.target.name]: e.target.value,
      loadData: true
    });
    this.componentDidMount(perPage, keyword);
  };

  handleChangeKeyWord = e => {
    const { perPage } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    this.componentDidMount(perPage, e.target.value);
  };

  render() {
    const { totalItems, activePage } = this.state;
    var i = (activePage - 1) * 10;
    return (
      <Card className="dashboard-card">
        {/*--------Modal-Success-----*/}
        <Modal
          isOpen={this.state.modalDeleteSuccess}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalDeleteSuccess}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: '#45b649' }}>Deleted succesfully</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteSuccess}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/*--------Modal-Success-----*/}

        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalDeleteError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModalDeleteError}
            className="card-header-custom"
          >
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: 'red' }}>Cannot delete this interviewer</span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalDeleteError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <CardHeader className="card-header-custom">
          interviewers Management
        </CardHeader>
        {this.state.loading ? (
          <div
            style={{
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '250px'
            }}
            className="sweet-loading"
          >
            <PulseLoader
              sizeUnit={'px'}
              size={15}
              color={'#45b649'}
              loading={this.state.loading}
            />
          </div>
        ) : (
          <CardBody>
            <Container fluid={true} className="role-container-head-row">
              <Row className="role-head-row">
                <Col sm="12" md="6" className="role-form-create">
                  <div className="form-header-area-button">
                    <Link to="/dashboard/create-interviewer">
                      <Button color="success">Create</Button>
                    </Link>
                    {this.state.listDeleteId.length != 0 && (
                      <ModalRemoveItem
                        itemName="these interviewers"
                        buttonLabel="Delete"
                        function={() => this.removeManyItems()}
                      />
                    )}
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <div className="header-table-custom">
                    <FormGroup>
                      <Label>Show entries</Label>
                      <Input
                        type="select"
                        name="selectPerPage"
                        id="exampleSelect"
                        value={this.state.selectPerPage}
                        onChange={this.handleChangePerPage}
                      >
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Search</Label>
                      <Input
                        className="role-input-search"
                        name="keyword"
                        value={this.state.keyword}
                        onChange={this.handleChangeKeyWord}
                      />
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </Container>
            {this.state.loadData ? (
              <div
                style={{
                  marginTop: '100px',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '250px'
                }}
                className="sweet-loading"
              >
                <PulseLoader
                  sizeUnit={'px'}
                  size={15}
                  color={'#45b649'}
                  loading={this.state.loadData}
                />
              </div>
            ) : (
              <div className="table-rm">
                <table className="table table-responsive-sm table-bordered table-striped table-hover table-custom">
                  <thead className="thead-light">
                    <tr>
                      <th style={{ width: '70px' }} />
                      <th style={{ width: '70px' }}>#</th>
                      <th style={{ width: '400px' }}>Full Name</th>
                      <th>Email</th>
                      <th style={{ width: '250px' }}>Phone</th>
                      <th style={{ width: '180px' }}>
                        <div className="action">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.rows.map(e => {
                      i++;
                      let url = '/dashboard/interviewer/' + e.id;
                      return (
                        <tr key={e.id}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={() => this.handleCheckChange(e)}
                            />
                          </td>
                          <td>{i}</td>
                          <td>{e.fullname}</td>
                          <td style={{ textOverflow: 'ellipsis' }}>
                            {e.email}
                          </td>
                          <td>{e.phone}</td>
                          <td>
                            <div className="action">
                              <div className="action-item">
                                <ModalEditInterviewer
                                  icon
                                  id={e.id}
                                  name={e.name}
                                  color="warning"
                                  buttonLabel="Edit"
                                  getUpdate={this.getUpdate.bind(this)}
                                  // function={this.editRole.bind(this)}
                                />
                              </div>
                              <div className="action-item">
                                <Link style={{ width: 'auto' }} to={url}>
                                  <Button
                                    className="view-button"
                                    color="primary"
                                  >
                                    <MdPageview />
                                  </Button>
                                </Link>
                              </div>
                              <div className="action-item">
                                <ModalRemoveItem
                                  itemName="this interviewer"
                                  function={() => this.removeItem(e.id)}
                                />
                              </div>
                            </div>
                            <div className="action-mobile">
                              <DropDownTable />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <br />
                <PaginationComponent
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.perPage}
                  totalItemsCount={totalItems}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  totalItems={this.state.totalItems}
                  activePage={this.state.activePage}
                />
              </div>
            )}
          </CardBody>
        )}
      </Card>
    );
  }
}
