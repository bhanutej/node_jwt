import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch(this.props.currentUser){
      case null:
        return(
          <li>
            <a href="/Login">Login</a>
          </li>
        );
      case false:
        return(
          <li>
            <a href="/Login">Login</a>
          </li>
        );
      default:
        return([
          <li key="1">{this.props.currentUser ? this.props.currentUser.email : ''}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ]);
    }
  }

  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <Link
            to='/' className="left brand-logo">
            Hr Pro
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            { this.renderContent() }
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps)(Header);
