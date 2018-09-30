import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/';
import UserCard from './UserCard';
import Modal from '../Modal/Modal';
import ConfirmPopup from '../Modal/ConfirmationPopUp';
import PayForm from './PayForm';


class UserList extends Component {

  constructor(props) {
    super(props)
    this.handleconfirmPopup = this.handleconfirmPopup.bind(this);

    this.state = {
      users: null,
      searchUsers: null,
      usersCount: 0,
      confirmPopup: false,
      payFormPopup: false,
      deletedUserId: null,
      payUserId: null
    }
  }

  componentWillReceiveProps(newProps) {
    const users = Object.assign({}, newProps.users);
    const usersCount = Object.keys(users).length;
    this.setState({ users: users, searchUsers: users, usersCount, confirmPopup: false });
  }

  componentDidMount(){
    this.props.fetchUsers();
  }
  
  handleconfirmPopup = (userId) => {    
    this.setState({ confirmPopup: !this.state.confirmPopup, deletedUserId: userId });
  }

  handlePayFormPopup = (userId) => {    
    this.setState({ payFormPopup: !this.state.payFormPopup, payUserId: userId });
  }

  closeConfirmationModalPopUp = () => {
    this.setState({ confirmPopup: !this.state.confirmPopup, deletedUserId: null });
  }

  closePaymentModalPopUp = () => {
    this.setState({ payFormPopup: !this.state.payFormPopup, payUserId: null });
  }

  handleDeleteUser = () => {
    this.props.deleteUser(this.state.deletedUserId);
  }

  renderContent(users) {
    switch(users){
      case null:
        return <p>No user found!</p>;
      case false:
        return(
          <p>123</p>
        );
      default:
        return(
          Object.keys(users).map((user, i) => {
            return <UserCard user={users[user]} key={i} handlePayFormPopup={this.handlePayFormPopup} handleConfirmPopup={this.handleconfirmPopup} handleDeleteUser={this.handleDeleteUser}/>;
          })
        );
    }
  }

  handleSearchUser = event => {
    let users = {};
    Object.keys(this.state.users).map((user, i) => {
      if(this.state.users[user].first_name.includes(event.target.value) || this.state.users[user].first_name.includes(event.target.value) || this.state.users[user].email.includes(event.target.value)){
        users[i] = this.state.users[user];
      }
    });
    const usersCount = Object.keys(users).length;
    if(Object.keys(users).length > 0){  
      this.setState({ searchUsers: users, usersCount });
    }else{
      this.setState({ searchUsers: null, usersCount });
    }
  }

  render(){
    return(
      <div>
        <Modal show={this.state.confirmPopup} modalClosed={this.closeConfirmationModalPopUp}>
          <ConfirmPopup modalClosed={this.closeConfirmationModalPopUp} handleDeleteUser={this.handleDeleteUser}/>
        </Modal>
        <Modal show={this.state.payFormPopup} modalClosed={this.closePaymentModalPopUp}>
          <PayForm modalClosed={this.closePaymentModalPopUp}/>
        </Modal>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">search</i>
            <input id="icon_prefix" type="text" className="validate" onChange={this.handleSearchUser}/>
            <label htmlFor="icon_prefix">Search</label>
          </div>
          <div className="input-field col s6">
            <div className="chip">
              Employees: 
              <span>&nbsp;{this.state.usersCount}</span>
            </div>
          </div>
        </div>
        <div className="row">
          { this.renderContent(this.state.searchUsers) }
        </div>
        
        <div className="fixed-action-btn">
          <Link to="/users/new" className="btn-floating btn-large waves-effect waves-light red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { users: state.users }
}

export default connect(mapStateToProps, actions)(UserList);
