import React from "react";

function UserList(props) {
  const { userDetails, index } = props;
  return (
    <>
      <tr htmlFor={userDetails.id}>
        <td>{index + 1}</td>
        <td>{userDetails.name}</td>
        <td>{userDetails.email}</td>
        <td>{userDetails.username}</td>
        <td></td>
      </tr>
    </>
  );
}

export default UserList;
