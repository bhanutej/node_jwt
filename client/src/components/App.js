import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Login from '../components/authComponents/Login';
import Landing from './Landing';
import AdminPage from '../layouts/AdminPage';
import UserPage from '../layouts/UserPage';
import NewUser from './adminContent/NewUser';
import UserList from './adminContent/UserList';
import UnAuthorized from './UnAuthorized';

class App extends Component {
  
  componentDidMount(){
    this.props.fetchCurrentUser();
  }

  renderContent() {
    if(this.props.currentUser){
      switch(this.props.currentUser.role){
        case 'user':
          return(
            <Route exact path="/user_page" component={ UserPage } />
          );
        case 'admin':
          return([
            <Route key="1" exact path="/admin_page" component={ AdminPage } />,
            <Route key="2" exact path="/users" component={ UserList } />,
            <Route key="4" exact path="/unauthorize" component={ UnAuthorized } />,
            <Switch key="6">
              <Route key="3" path="/users/new" component={ NewUser } />,
              <Route key="5" path="/users/:_id" component={ NewUser } />
            </Switch>
          ]);
        default:
          return(
            <Route exact path="/" component={ Landing } />
          );
      }
    }else{
      return(
        <Route key="1" exact path="/" component={ Landing } />
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className='Container'>
          <Header />
          { this.renderContent() }
          <Route exact path="/login" component={ Login } />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, actions)(App);
