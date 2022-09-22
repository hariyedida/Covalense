import React, { Component } from "react";
import apiStatusConstants from "../ApiStatusConstants";
import Loader from "react-loader-spinner";
import "./style.css";
import UserList from "./UserList";

class FetchApi extends Component {
  state = {
    apiStaus: apiStatusConstants.initial,
    fetchedData: [],
  };

  componentDidMount = () => {
    this.getAllUserDetails();
  };

  getAllUserDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const apiUrl = `https://jsonplaceholder.typicode.com/users`;
    const response = await fetch(apiUrl);

    if (response.ok === true) {
      const fetchedData = await response.json();
      this.setState({
        fetchedData,
        searchData: fetchedData,
        apiStatus: apiStatusConstants.success,
        searchInput: "",
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  onChangeSearchInput = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  renderSuccesView = () => {
    const { fetchedData, searchInput } = this.state;
    const searchData = fetchedData.filter((each) =>
      each.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <div className="main-container">
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          placeholder="search by name..."
          className="search-container"
        />
        <table>
          {/* table header */}
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/*table body */}
            {searchData.length > 0 ? (
              <>
                {searchData.map((eachUser, index) => (
                  <UserList
                    key={eachUser.id}
                    userDetails={eachUser}
                    index={index}
                  />
                ))}
              </>
            ) : (
              //  if user list is empty either by no search results
              // or no users in the array no results text is displayed
              <tr>
                <td>No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  renderFailureView = () => (
    <div>
      <p>failure</p>
      <button type="button" onClick={this.getAllUserDetails}>
        Retry
      </button>
    </div>
  );

  renderLoadingView = () => (
    <div className="loader-container content">
      <Loader type="Oval" color="#475569" height="50" width="50" />
    </div>
  );

  renderUI = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccesView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };
  render() {
    return this.renderUI();
  }
}

export default FetchApi;
