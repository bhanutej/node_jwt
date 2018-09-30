import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";


class Tabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  renderHeader(fieldInfo){
    return(
      <tr>
        {fieldInfo.map((header) => {
          return <th key={header.field}>{header.headName}</th>
        })}
        <th>Actions</th>
      </tr>
    );
  }

  renderBody(usersInfo, headInfo){
    return (usersInfo.map((user) => {
      return (<tr key={user.email}>
        {headInfo.map((header) => {
          if (typeof(user[header.field]) === "boolean") {
            return <td key={header.field}>{user[header.field] === true ? "True" : "False"}</td>  
          }
          return <td key={header.field}>{user[header.field]}</td>
        })}
        <td>
          <Link to={`users/${user._id}`}><i className="material-icons">border_color</i></Link>
        </td>
      </tr>)
    }));
  }

  render(){
    return(
      <table>
        <thead>
          {this.renderHeader(this.props.fieldInfo)}
        </thead>
        <tbody>
          {this.renderBody(this.props.response, this.props.fieldInfo)}
        </tbody>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </table>
    )
  }
}

export default Tabel;
