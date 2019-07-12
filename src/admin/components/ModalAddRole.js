import React, { Component } from 'react'
import { Button,Modal, ModalHeader, ModalBody, 
  ModalFooter,Card,CardBody,FormGroup,Form,Label,Input } from 'reactstrap';
  import './ModalConfirmPassword.css';
  import '../pages/RolesPage.css'
import CollapsePermission from '../components/CollapsePermission';
import { MDBBtn } from "mdbreact";
export default class ModalAddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      permissions : {
          columns: [
          {
            label: 'Id',
            field: 'id',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 300
          },
          {
            label: 'Action',
            field: 'action',
            sort: 'asc',
            width: 100
          }
          ],
        rows : []
        },
        itemId:'',
      itemName: '',
      listChecked : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  async componentWillMount(){
    //const {firstName, lastName, email} = this.state;
    const columns = this.state.permissions.columns;
    let list = this.state.listChecked;
    var url = 'http://api.enclavei3dev.tk/api/permission';
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    
    data.data.map((e)=>{
      delete e.created_at;
      delete e.updated_at;
      return e.action = <input type='checkbox' onChange={() => handleCheck(e)} />
    })
    function handleCheck(e){
      String(e.id);
      list.push(e.id);  
    }
    this.setState({
      permissions : {
        columns: columns,
        rows: data.data
      },
      listChecked: list
    })
  }
  handleChange(event) {
    this.setState({
      itemName: event.target.value
    });
  }



  wrapperFunction= () => {  
      this.addItem();
      this.toggle();
  }

  addItem(){
    const {itemName,listChecked} = this.state;
    const list = listChecked.toString();
    var url = 'http://api.enclavei3dev.tk/api/role'; 
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify({
        name: itemName,
        permissions: list
      }), 
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
      }
    })            
    .then(res => {
      if (res.status ===401) {
        alert('Add Failed')
      }
      if (res.status === 422) {
        alert('Add Failed')
      }
      if (res.status === 200) {
        res.json().then(data =>{
          fetch('http://api.enclavei3dev.tk/api/role?page=1', {
            headers:{
              'Content-Type': 'application/json',
              'Accept' : 'application/json',
              'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
            }
          }).then(res => {
            res.json().then(data => {
               
              data.data.forEach(function(e) {
                delete e.created_at;
                delete e.updated_at;
                // delete e.id;
              })
              console.log(data)
              this.props.function(data);
            })
          }) 
        })
      }
    })
    .catch(error => console.error('Error:', error)); 
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  render() {
    return (
      <div >
        <MDBBtn style={{marginLeft:'6.2%',marginBottom:'5%',border:'none',color:'white'}} onClick={this.toggle} rounded color='success'>{this.props.buttonLabel}</MDBBtn>
          {/* <Button style={{marginLeft:'6.2%',marginBottom:'5%'}} color={this.props.color} onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
          <ModalHeader toggle={this.toggle} >Add A New</ModalHeader>
          <ModalBody>
          <Card>
              <CardBody>
                <Form>
                  <FormGroup className="password-input">
                  <Label for="exampleName" style={{marginTop:'1%',marginLeft:'1%'}}>Role:</Label>
                  <Input
                    style={{marginRight:'1%'}}
                    className="input-first"
                    type="text"
                    name="role"
                    placeholder='Enter New Role'
                    onChange = {this.handleChange}
                  />
                  </FormGroup>
                  <FormGroup >
                  <CollapsePermission data={this.state.permissions}/>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.wrapperFunction}>{this.props.nameButtonAccept}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}