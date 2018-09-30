import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import userFormFields from './userFormFields';
import addressFormFields from './addressFormFields';
import * as actions from '../../actions';


class NewUser extends Component {

  state = {
    errors: {
      address: {}
    },
    _id: this.props.user ? this.props.user._id : null, 
    email: this.props.user ? this.props.user._id ? this.props.user.email : '' : '', 
    password: '',
    role: 'user',
    first_name: this.props.user ? this.props.user.first_name : '',
    last_name: this.props.user ? this.props.user.last_name : '',
    employee_id: this.props.user ? this.props.user.employee_id : '',
    blood_group: this.props.user ? this.props.user.blood_group : '',
    contact: this.props.user ? this.props.user.contact : '',
    address: {
      street_one: this.props.user ? this.props.user.address.street_one : '',
      street_two: this.props.user ? this.props.user.address.street_two : '',
      door_no: this.props.user ? this.props.user.address.door_no : '',
      city: this.props.user ? this.props.user.address.city : '',
      pincode: this.props.user? this.props.user.address.pincode : '',
      state: this.props.user ? this.props.user.address.state : '',
      country: this.props.user ? this.props.user.address.country : ''
    }
  }

  componentWillReceiveProps(newProps) {
    const errors = Object.assign({}, newProps.errorMessages);
    const user = Object.assign({}, newProps.user);
    this.setState({ 
      _id: user ? user._id : null, 
      email: user ? user.email : '', 
      password: '',
      role: 'user',
      first_name: user ? user.first_name : '',
      last_name: user ? user.last_name : '',
      employee_id: user ? user.employee_id : '',
      blood_group: user ? user.blood_group : '',
      contact: user ? user.contact : '',
      address: {
        street_one: user.address ? user.address.street_one : '',
        street_two: user.address ? user.address.street_two : '',
        door_no: user.address ? user.address.door_no : '',
        city: user.address ? user.address.city : '',
        pincode: user.address ? user.address.pincode : '',
        state: user.address ? user.address.state : '',
        country: user.address ? user.address.country : ''
      }
     })
    this.setState({ errors });
  }

  componentDidMount(){
    if(this.props.match.params._id){
      this.props.fetchUser(this.props.match.params._id);
    }
    this.props.fetchUsers();
  }

  fileSelectedHandler = event => {
    let errors = Object.assign({}, this.state.errors);
    delete errors.employeePic;
    this.setState({
      employeePic: event.target.files[0],
      picName: event.target.files[0].name,
      errors
    })
  }

  handleChange = event => {
    let errors = Object.assign({}, this.state.errors);
    delete errors[event.target.name];
    this.setState({
      [event.target.name]: event.target.value,
      errors
    });
  }

  handleAddressChange = event => {
    let errorInAddress = Object.assign({}, this.state.errors.address);
    delete errorInAddress[event.target.name];
    let address = { ...this.state.address };
    let errors = { ...this.state.errors }
    errors.address = errorInAddress;
    address[event.target.name] = event.target.value;
    this.setState({
      address, 
      errors
    });
  }

  handleUserFormSubmit = event => {
    event.preventDefault();
    let errors = {address:{}};
    if(this.state.email === '' || this.state.email === undefined) errors.email = "Please provide email";
    if((this.state.password === '' || this.state.password === undefined)&&(!this.state._id)) errors.password = "Please provide password";
    if(this.state.first_name === '' || this.state.first_name === undefined) errors.first_name = "Please provide first_name";
    if(this.state.last_name === '' || this.state.last_name === undefined) errors.last_name = "Please provide last_name";
    if(this.state.employee_id === '' || this.state.employee_id === undefined) errors.employee_id = "Please provide employee_id";
    if(this.state.contact === '' || this.state.contact === undefined) errors.contact = "Please provide contact";
    if(this.state.blood_group === '' || this.state.blood_group === undefined) errors.blood_group = "Please provide blood_group";
    if(this.state.address.street_one === '') errors.address.street_one = "Please provide street_one";
    if(this.state.address.street_two === '') errors.address.street_two = "Please provide street_two";
    if(this.state.address.door_no === '') errors.address.door_no = "Please provide door_no";
    if(this.state.address.city === '') errors.address.city = "Please provide city";
    if(this.state.address.state === '') errors.address.state = "Please provide state";
    if(this.state.address.country === '') errors.address.country = "Please provide country";
    if(this.state.address.pincode === '') errors.address.pincode = "Please provide pincode";
    this.setState({ errors }, () => {
      const userFields = Object.assign({}, this.state.errors);
      delete userFields.address;
      const userAddressFields = Object.assign({}, this.state.errors.address);
      const isValid = ((Object.keys(userFields).length === 0) && (Object.keys(userAddressFields).length === 0));
      if (isValid){
        const userObject = Object.assign({}, this.state);
        delete userObject.errors;
        if(this.state._id){
          this.props.updateUserFormSubmit(userObject, this.props.history, this.state._id);
        }else{
          this.props.createUserFormSubmit(userObject, this.props.history);
        }
      }
    });
  }

  renderUserFields(){
    return _.map(userFormFields, ({ name, label }) => {
      if(name === 'role'){
        return(
          <div key={name}>
            <select name={name} style={{display: 'block'}}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ) 
      }else{
        return (
          <div key={name}>
            <div className="input-field">
              <input id={name} className="validate" name={name} type={name === 'password' ? 'password' : 'text'} value={this.state[name] || ''} onChange={this.handleChange} />
              <label className="active" >{label}</label>
            </div>
            <span className="red-text text-darken-2">{this.state.errors ? this.state.errors[name] : ''}</span>
          </div>
        )
      }
    });
  }

  renderAddressFields(){
    return _.map(addressFormFields, ({ name, label }) => {
      const fieldName = name.split('.')[1];
      return (
        <div key={name}>
          <div className="input-field">                                                                                                                                                                
            <input id={fieldName} className="validate" name={fieldName} type='text' value={this.state.address[fieldName] || ''} onChange={this.handleAddressChange}/>
            <label className="active" >{label}</label>
          </div>
          <span className="red-text text-darken-2">{this.state.errors.address ? this.state.errors.address[fieldName] : ''}</span>
        </div>
      )
    });
  }

  renderFormContent(){
    return (
      <div className="container">
        <div className="row">
          <h5>Register New Employee</h5>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                {this.renderUserFields()}
              </div>
              <div className="input-field col s6">
                {this.renderAddressFields()}
              </div>
            </div>
            <div className="row" style={{float: 'right'}}>
              <a className="waves-effect waves-light btn" onClick={this.handleUserFormSubmit} ><i className="material-icons right">send</i>Submit</a>  
            </div>
          </form>
        </div> 
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.renderFormContent()}
      </div>
    )
  }
}

function mapStateToProps(state, props){
  if(props.match.params._id){
    return{
      user: state.users ? state.users.find(user => user._id === props.match.params._id) : null
    }
  }
  if (state.user.length > 0){
    return { 
      user: null,
      errorMessages: state.errorMessage 
    }
  }
  return { 
    errorMessages: state.userErrorObj ? state.userErrorObj.errors : null,
    user: state.userErrorObj ? state.userErrorObj.user : null,
    users: state.users
  };
}
export default connect(mapStateToProps, actions)(withRouter(NewUser));
