import React from 'react';

import './ConfirmationPopUp.css';

const ConfirmationPopUp = (props) => (
  <div>
    <h5>Are you sure? You want to delete?</h5>
    <div className="modal-btn-content" style={{display: 'flex', justifyContent: 'space-between', marginTop: '3em'}}>
      <button className="btn waves-effect waves-light" type="button" name="action" onClick={props.modalClosed}>No
        <i className="material-icons right">close</i>
      </button>
      <button className="btn waves-effect waves-light red lighten-2" type="button" name="action" onClick={props.handleDeleteUser}>Yes
        <i className="material-icons right">check</i>
      </button>
    </div>
  </div>
);

export default ConfirmationPopUp;
