import React, { Component } from 'react';
import _ from 'lodash';
import payFormFields from './payFormFields';

class PayForm extends Component {
  state = {
    errors:{},
    _id: null,
    ctc: 0,
    basic: 0,
    basic_amount: 0,
    hra: 0,
    hra_amount: 0,
    pf_epr: 0,
    pf_epr_amount: 0,
    pf_eps: 0,
    pf_eps_amount: 0,
    fbp: 0,
    fbp_amount: 0,
    bonus: 0,
    bonus_amount: 0,
    monthly: 0
  }

  handleChange = event => {
    let errors = Object.assign({}, this.state.errors);
    delete errors[event.target.name];
    let monthly = 0;
    if (event.target.name !== 'ctc'){
      monthly = (((this.state.ctc / 12)*event.target.value) / 100) + this.state.monthly;
    }
    this.setState({
      [event.target.name]: event.target.value,
      monthly,
      errors
    });
  }

  renderFormContent(){
    return _.map(payFormFields, ({ name, label }) => {
      if(name === 'ctc' || name === 'monthly'){
        return (
          <div key={name}>
            <div className="input-field">
              <input id={name} className="validate" name={name} type='text' value={this.state[name] || ''} onChange={this.handleChange} />
              <label className="active" >{label}</label>
            </div>
            <span className="red-text text-darken-2">{this.state.errors ? this.state.errors[name] : ''}</span>
          </div>
        )
      }else{
        const amountField = `${name}_amount`;
        return (
          <div key={name}>
            <div className='row'>
              <div className="col s6">
                <div className="input-field">
                  <input id={name} className="validate" name={name} type='text' value={this.state[name] || ''} onChange={this.handleChange} />
                  <label className="active" >{label}</label>
                </div>
                <span className="red-text text-darken-2">{this.state.errors ? this.state.errors[name] : ''}</span>
              </div>
              <div className="col s6">
                <div className="input-field">
                  <input id={`${name}_amount`} className="validate" name={`${name}_amount`} type='text' value={this.state[amountField] || ''} onChange={this.handleChange} />
                  <label className="active" >{`${label} Amount`}</label>
                </div>
                <span className="red-text text-darken-2">{this.state.errors ? this.state.errors[amountField] : ''}</span>
              </div>
            </div>
          </div>
        )
      }
    });
  }

  handleSubmitPayForm = event => {
    event.preventDefault();
    let errors = {};
    if(this.state.ctc === null || this.state.ctc === '') errors.ctc = "Please provide Total CTC";
    if(this.state.basic === null || this.state.basic === '') errors.basic = "Please provide Basic percentage";
    if(this.state.basic === null || this.state.hra === '') errors.hra = "Please provide HRA percentage";
    if(this.state.basic === null || this.state.pf_epr === '') errors.pf_epr = "Please provide PF Employer's percentage";
    if(this.state.basic === null || this.state.pf_eps === '') errors.pf_eps = "Please provide PF Employee's percentage";
    if(this.state.basic === null || this.state.fbp === '') errors.fbp = "Please provide FBP percentage";
    if(this.state.basic === null || this.state.bonus === '') errors.bonus = "Please provide Bonus percentage";
    this.setState({ errors }, () => {
      const errorPaymentFields = Object.assign({}, this.state.errors);
      const isValid = Object.keys(errorPaymentFields).length === 0;
      if(isValid){
        const userPaymentObject = Object.assign({}, this.state);
        delete userPaymentObject.errors;
        this.props.createUserPaymentSubmit(userPaymentObject);
      }
    });
  }

  render(){
    return(
      <div>
        {this.renderFormContent()}
        <div className="modal-btn-content" style={{display: 'flex', justifyContent: 'space-between', marginTop: '3em'}}>
          <button className="btn waves-effect waves-light red lighten-2" type="button" name="action" onClick={this.props.modalClosed}>Cancel
            <i className="material-icons right">close</i>
          </button>
          <button className="btn waves-effect waves-light" type="button" name="action" onClick={this.handleSubmitPayForm}>Submit
            <i className="material-icons right">check</i>
          </button>
        </div>
      </div>
    )
  }
}

export default PayForm;
