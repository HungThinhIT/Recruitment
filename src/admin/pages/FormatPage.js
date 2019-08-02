import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import ModalEditItem from '../components/ModalEditItem';
import ModalRemoveItem from '../components/ModalRemoveItem';
import { MdCancel, MdPageview } from 'react-icons/md';
const styleFont = {
  fontSize: '200%',
  display: 'flex',
  justifyContent: 'space-between',
  fontWeight: 'bold'
};

const styleCard = {
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};
export default class FormatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDeleteName: [],
      listDeleteId: [],
      rows: [],
      currentPage: 0,
      activePage: 1,
      totalItems: 0,
      listId: [],
      loading: true
    };
    // this.handleCheckChange = this.handleCheckChange.bind(this);
    // this.handlePageChange = this.handlePageChange.bind(this);
    // this.removeManyItems = this.removeManyItems.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentWillMount() {
    if (!localStorage.getItem('access_token')) {
      this.props.history.push('/dashboard/login');
    }
  }
  async componentDidMount() {
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    const data = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => res.json());
    setTimeout(() => {
      this.setState({
        rows: data,
        loading: false
      });
    }, 500);
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
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        formatId: listDeleteId,
        status: 'all'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch(
        'https://api.enclavei3dev.tk/api/format-article?page=' + activePage,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
        res.json().then(data => {
          this.setState({
            rows: data,
            listDeleteId: []
          });
        });
      });
    });
  }

  removeItem(id) {
    const { activePage } = this.state;
    var array = [];
    array.push(id);
    var url = 'https://api.enclavei3dev.tk/api/format-article';
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({
        formatId: array,
        status: 'none'
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }).then(res => {
      fetch(
        'https://api.enclavei3dev.tk/api/format-article?page=' + activePage,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
      ).then(res => {
        res.json().then(data => {
          this.setState({
            rows: data
          });
        });
      });
    });
  }

  render() {
    var i = 0;
    return (
      <Card style={styleCard}>
        <CardHeader style={styleFont}>
          Format Management
          <div className="icon-cancle">
            <Link to="/dashboard/article">
              <MdCancel />
            </Link>
          </div>
        </CardHeader>
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
            <div className="area-btn-header">
              <Link to="/dashboard/create-format">
                <Button color="success">Create A New Format</Button>
              </Link>
            </div>
            <br />
            {this.state.listDeleteId.length != 0 && (
              <ModalRemoveItem
                itemName="this formats"
                buttonLabel="DELETE"
                function={() => this.removeManyItems()}
              />
            )}
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
                    <th style={{ width: '5%' }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: '5%' }}>#</th>
                    <th>Title</th>
                    {/* <th>Created At</th>
                  <th>Updated At</th> */}
                    <th style={{ width: '180px' }}>
                      <div className="action">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map(e => {
                    i++;
                    let url = '/dashboard/format/' + e.id;
                    return (
                      <tr key={e.id}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => this.handleCheckChange(e)}
                          />
                        </td>
                        <td>{i}</td>
                        <td>{e.title}</td>
                        {/* <td>{e.created_at}</td>
                      <td>{e.updated_at}</td> */}
                        <td>
                          <div className="action">
                            <ModalEditItem
                              icon
                              // id={listId[index]}
                              name={e.name}
                              color="success"
                              buttonLabel="Edit"
                              // function={this.editRole.bind(this)}
                            />
                            <Link style={{ width: 'auto' }} to={url}>
                              <Button className="view-button" color="primary">
                                <MdPageview />
                              </Button>
                            </Link>
                            <ModalRemoveItem
                              function={() => this.removeItem(e.id)}
                              itemName="this format"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        )}
      </Card>
    );
  }
}
