import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return(
    <div className="container">
      <h5 className="header">Admin Panel</h5>
      <div className="row">
        <div className="col s6 m4">
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <p>I am a very simple card. Check Employees here.</p>
              </div>
              <div className="card-action">
                <Link
                  to=''>
                  This is a link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default AdminPage;
