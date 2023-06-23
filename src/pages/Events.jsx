import React, {useState, useEffect} from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
    "id", "Title", "Price", "Started Date", "Ended Date", "Topic", "Image", "Organizer", "Action", "Delete", "Edit"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const badgeStatus = {
    active: "success",
    ban: "warning",
    return: "primary",
    banned: "danger",
};

const colors = ["success", "primary", "warning", "secondary", "info", "light", "dark", "muted", "white", "danger"]

const Events = () => {
    const [listUser, setListUser] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getEvents()
        return () => {
            setLoading(false);
        };
    }, []);

    async function getEvents() {
        try {
            await callAPI("get", "/events")
                .then((res) => {
                    setListUser(res?.data);
                })
                .catch((err) => console.log(err));
        } catch (error) {
        }
    }

    const deleteUser = async (id) => {
        setLoading(true);
        if (window.confirm("Are you sure")) {
            await callAPI("DELETE", `events/${id}`)
            setLoading(false);
            window.location.reload();
        }
    }

    const update = async (id) => {

    }

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{++index}</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.started_date}</td>
            <td>{item.ended_date}</td>
            <td> {item.topics.map(topic =>
                <Badge type={colors[Math.floor(Math.random()*colors.length)]} content={topic}></Badge>)
            }
            </td>
            <td><img width={200} src={item.image.url} alt=""></img></td>
            <td>{item.organizer}</td>
            <td>{loading === true ? "loading..." :
                <Badge type={badgeStatus[item.verified]} content={item.verified}/>}</td>
            <td>
                <div className='cursor_pointer' onClick={() => deleteUser(item.id)}>
                    <Badge type="danger" content="delete"/></div>
            </td>
            <td>
                <div className='cursor_pointer'>
                    <Badge type="primary" content="edit"/></div>
            </td>
        </tr>
    );
    return (
        <div>
            <h2 className="page-header">All Events</h2>
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
