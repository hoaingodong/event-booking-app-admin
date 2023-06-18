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
  "Actived",
  "action",
  "delete"
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const badgeStatus = {
  active: "success",
  ban: "warning",
  return: "primary",
  banned: "danger",
};

const Users = () => {
  const [listUser, setListUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTutor();
    return () => {
      setLoading(false);
    };
  }, []);

  async function getTutor() {
    try {
      await callAPI("get", "/users")
        .then((res) => {
          setListUser(res?.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
  }

const deleteUser = async (id) => {
  setLoading(true);
  const res = await callAPI("DELETE", `user/${id}`)
  setLoading(false);
  alert(res.data)
  window.location.reload();
}

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{++index}</td>
    <td>{item.email}</td>
    <td>{item.name}</td>
    <td>{item.role}</td>
    <td>{item.interests}</td>
    <td><img src = {item.avatar || null} alt =""></img></td>
    <td>{String(item.verified)}</td>
    <td>{loading === true ? "loading..." :<Badge type={badgeStatus[item.verified]} content={item.verified} />}</td>
    <td><div className='cursor_pointer' onClick={()=> deleteUser(item._id)} >
      <Badge type="danger" content="delete" /></div>
    </td>
  </tr>
);
  return (
    <div>
      <h2 className="page-header">customers</h2>
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
