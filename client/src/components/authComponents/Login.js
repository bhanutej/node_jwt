import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';

class Login extends Component {
  constructor(){
    super();
    this.state={
      email:'',
      password:''
    }
  }

  renderContent() {
    switch(this.props.errorMessage){
      case null:
        return;
      case false:
        return;
      default:
        return(
          <p className="red-text text-ldarken-4">*{this.props.errorMessage}</p>
        );
    }
  }

  render(){
    return(
      <div className="row">
        <div className="col s4"></div>
        <form className="col s4">
          <div style={{ textAlign: 'center' }}>
            {this.renderContent()}
          </div>
          
          <div className="row">
            <div className="input-field">
              <input placeholder="Email" type="text" className="validate" onChange={(event) => {this.setState({email:event.target.value})}}/>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input placeholder="Password" type="password" className="validate" onChange={(event) => {this.setState({password:event.target.value})}}/>
            </div>
          </div>

          <div>
            <a className="waves-effect waves-light btn" onClick={() => this.props.handleLogin(this.state.email, this.state.password, this.props.history)}>Login</a>  
          </div>
        </form>
        <div className="col s4"></div>
       </div>
    );
  }
}

function mapStateToProps(state){
  return { errorMessage: state.errorMessage }
}
export default connect(mapStateToProps, actions)(withRouter(Login));
