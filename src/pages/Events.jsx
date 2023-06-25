import React, {useState, useEffect} from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge"

import Modal from "./Modal";

const customerTableHead = [
    "id", "Title", "Price", "Started Date", "Ended Date", "Topics", "Image", "Organizer", "Action", "Delete", "Edit"];

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
    const [isShowModal, setIsShowModal] = useState(false)

    useEffect(() => {
        getEvents()
        return () => {
            setLoading(false);
        };
    }, []);

    const toggleModal = () => {
		setIsShowModal(!isShowModal);
	};

    async function getEvents() {
        try {
            await callAPI("get", "/events/all")
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


    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{++index}</td>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{Date(item.started_date)}</td>
            <td>{Date(item.ended_date)}</td>
            <td style={{width: '300px'}}>
            {item.topics.map((topic, index) => (
                <span key={topic}>
                <Badge
                    type={colors[Math.floor(Math.random() * colors.length)]}
                    content={topic}
                ></Badge>
                {(index + 1) % 3 === 0 && <br/>}
                </span>
            ))}
            </td>
            <td><img width={200} src={item?.image?.url} alt=""></img></td>
            <td>{item?.organizer?.name}</td>
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
            {isShowModal && (<Modal onRequestClose={toggleModal} />)}
            <h2 className="page-header">All Events</h2>
                <div className='cursor_pointer' onClick={toggleModal}>
                    <Badge type="primary" content="Create new"/></div>
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
