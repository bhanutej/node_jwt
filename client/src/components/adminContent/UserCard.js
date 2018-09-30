import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserCard extends Component {

	handleConfirmationPopUp = (userId) => {
		this.props.handleConfirmPopup(userId);
	}

	handlePaymentPopUp = (userId) => {
		this.props.handlePayFormPopup(userId);
	}

  render(){
    return(
			<div className="col s12 m3">
				<div className="card hoverable">
					<div className="card-image waves-effect waves-block waves-light">
						<img className="activator" alt="User profile pic" src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
					</div>
					<div className="card-content">
						<span className="card-title activator grey-text text-darken-4">{this.props.user.first_name+" "+this.props.user.last_name}<i className="material-icons right">more_vert</i></span>
						<p><a href="">{this.props.user.email}</a></p>
					</div>
					<div className="card-reveal">
						<span className="card-title grey-text text-darken-4">User Details<i className="material-icons right">close</i></span>
						<div>
							<div><b>Emp ID:</b>{this.props.user.employee_id}</div>
							<div><b>Contact:</b>{this.props.user.contact}</div>
							<div><b>Blood Group:</b>{this.props.user.blood_group}</div>
							<div><b>Address:</b>{this.props.user.address.street_one}, {this.props.user.address.street_two},
								{this.props.user.address.door_no}, {this.props.user.address.city}, {this.props.user.address.state}, {this.props.user.address.country}, {this.props.user.address.pincode}
							</div>
						</div>
					</div>
					<div className="card-action">
						<a onClick={(event) => this.handlePaymentPopUp(this.props.user._id, event)}><i className="material-icons">style</i></a>
						<Link to={`users/${this.props.user._id}`}><i className="material-icons">border_color</i></Link>
						<a onClick={(event) => this.handleConfirmationPopUp(this.props.user._id, event)}><i className="material-icons">delete</i></a>
					</div>
				</div>
			</div>
    )
  }
}

export default UserCard;
