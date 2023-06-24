import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
  "Number",
  "email",
  "Name",
  "Role",
  "Interests",
  "Avatar",
  "Actived"
];

const colors = ["success", "primary", "warning", "secondary", "info", "light", "dark", "muted", "white", "danger"]

const renderHead = (item, index) => <th key={index}>{item}</th>;

const Users = () => {
  const [listUser, setListUser] = useState();
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      await callAPI("get", "/users")
        .then((res) => {
          setListUser(res?.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{++index}</td>
    <td>{item.email}</td>
    <td>{item.name}</td>
    <td>{item.role}</td>
    <td>
      {item.interests.map((interest, index) => (
        <span key={interest}>
          <Badge
            type={colors[Math.floor(Math.random() * colors.length)]}
            content={interest}
          ></Badge>
          {(index + 1) % 3 === 0 && <br/>}
        </span>
      ))}
    </td>
    <td><img width={100} src = {item?.avatar?.url} alt =""></img></td>
    <td>{String(item.verified)}</td>
  </tr>
);
  return (
    <div>
      <h2 className="page-header">All Users</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {listUser && (
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={listUser}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
