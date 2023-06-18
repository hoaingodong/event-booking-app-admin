import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
  "id",
  "Title",
  "Price",
  "Started Date",
  "Ended Date",
  "Topic",
  "Image",
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

const Events = () => {
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
      await callAPI("get", "/events")
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
    <td>{item.title}</td>
    <td>{item.price}</td>
    <td>{item.started_date}</td>
    <td>{item.ended_date}</td>
    <td>{item.topic}</td>
    <td><img src = {item.image || null} alt =""></img></td>
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

export default Events;
