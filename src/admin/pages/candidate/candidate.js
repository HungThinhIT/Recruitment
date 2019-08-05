import React, { Component } from 'react';

import { MdPageview } from 'react-icons/md';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  InputGroupAddon,
  InputGroup,
  Input,
  Container,
  Row,
  Col,
  FormGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ModalEditItem from '../../components/ModalEditItem';
import ModalRemoveItem from '../../components/ModalRemoveItem';
import { PulseLoader } from 'react-spinners';
import DropDownTable from '../../components/DropDownTable.js';
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
      loading: true
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.removeManyItems = this.removeManyItems.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }

  async componentDidMount() {
    var url = 'https://api.enclavei3dev.tk/api/list-candidate?page=1';
    const data = await fetch(url, {
      method: 'POST',
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
        loading: false
      });
    }, 500);
  }

  handlePageChange(pageNumber) {
    var url =
      'https://api.enclavei3dev.tk/api/list-candidate?page=' + pageNumber;
    fetch(url, {
      method: 'POST',
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
          activePage: pageNumber
        });
      });
    });
  }
  removeItem(id) {
    const { activePage } = this.state;
    var array = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/candidate';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        candidateId: array,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch(
        'https://api.enclavei3dev.tk/api/list-candidate?page=' + activePage,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
        res.json().then(data => {
          data.data.forEach(function(e) {
            delete e.created_at;
            delete e.updated_at;
          });
          this.setState({
            rows: data.data,
            totalItems: data.total
          });
        });
      });
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
    const { listDeleteId, activePage } = this.state;
    var url = 'https://api.enclavei3dev.tk/api/candidate';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        candidateId: listDeleteId,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch(
        'https://api.enclavei3dev.tk/api/list-candidate?page=' + activePage,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
        res.json().then(data => {
          this.setState({
            rows: data.data,
            totalItems: data.total,
            listDeleteId: [],
            listDeleteName: []
          });
        });
      });
    });
  }
  render() {
    var i = 0;
    return (
      <Card className="dashboard-card">
        <CardHeader className="card-header-custom">
          Candidate Management
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
                  {this.state.listDeleteId.length != 0 && (
                    <ModalRemoveItem
                      itemName="these candidates"
                      buttonLabel="Delete"
                      function={() => this.removeManyItems()}
                    />
                  )}
                </Col>
                <Col sm="12" md="6" className="role-form-search">
                  <Row style={{}}>
                    <Col sm="12" md="5">
                      <FormGroup>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>Show 10 entries</option>
                          <option>Show 20 entries</option>
                          <option>Show 50 entries</option>
                          <option>Show 100 entries</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm="12" md="7">
                      <InputGroup className="role-input-group-search">
                        <Input className="role-input-search" />
                        <InputGroupAddon addonType="append">
                          <Button className="role-btn-search" color="success">
                            Search
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <div className="table-rm">
              <table className="table table-responsive-sm table-bordered table-striped table-hover table-custom">
                <thead className="thead-light">
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>#</th>
                    <th>Name</th>
                    <th style={{ textOverflow: 'ellipsis' }}>Email</th>
                    <th>Status</th>
                    <th>Phone</th>
                    <th style={{ width: '180px' }}>
                      <div className="action">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map(e => {
                    if (e.status == '1') {
                      e.status = 'Pending';
                    }
                    if (e.status == '2') {
                      e.status = 'Deny';
                    }
                    if (e.status == '3') {
                      e.status = 'Approve Application';
                    }
                    if (e.status == '4') {
                      e.status = 'Passed';
                    }
                    if (e.status == '5') {
                      e.status = 'Failed';
                    }
                    i++;
                    let url = '/dashboard/candidate/' + e.id;
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
                        <td
                          style={{
                            textOverflow: 'ellipsis',
                            maxWidth: 150,
                            minWidth: 80
                          }}
                        >
                          {e.email}
                        </td>
                        <td>{e.status}</td>
                        <td>{e.phone}</td>
                        <td>
                          <div className="action">
                            <div className="action-item">
                              <ModalEditItem
                                icon
                                // id={listId[index]}
                                name={e.name}
                                color="warning"
                                buttonLabel="Edit"
                                // function={this.editRole.bind(this)}
                              />
                            </div>
                            <div className="action-item">
                              <Link style={{ width: 'auto' }} to={url}>
                                <Button className="view-button" color="primary">
                                  <MdPageview />
                                </Button>
                              </Link>
                            </div>
                            <div className="action-item">
                              <ModalRemoveItem
                                itemName="this candidate"
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
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalItems}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </CardBody>
        )}
      </Card>
    );
  }
}
