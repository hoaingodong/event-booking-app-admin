import React, {useState, useEffect} from "react";

import Table from "../components/table/Table";

import callAPI from "../api/api";

import Badge from "../components/badge/Badge";

const customerTableHead = [
    "id", "From", "To", "Stars", "Content", "Date", "Action", "Delete"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const badgeStatus = {
    active: "success",
    ban: "warning",
    return: "primary",
    banned: "danger",
};

const Reviews = () => {
    const [listUser, setListUser] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getReviews()
        return () => {
            setLoading(false);
        };
    }, []);

    async function getReviews() {
        try {
            await callAPI("get", "/reviews/")
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
            await callAPI("DELETE", `reviews/${id}`)
            setLoading(false);
            alert("Delete successfully")
            window.location.reload();
        }
    }


    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{++index}</td>
            <td>{item?.from_user?.name}</td>
            <td>{item?.to_user?.name}</td>
            <td>{item.stars}</td>
            <td>{item.content}</td>
            <td>{Date(item.date)}</td>
            <td>{loading === true ? "loading..." :
                <Badge type={badgeStatus[item.verified]} content={item.verified}/>}</td>
            <td>
                <div className='cursor_pointer' onClick={() => deleteUser(item.id)}>
                    <Badge type="danger" content="delete"/></div>
            </td>
        </tr>
    );
    return (
        <div>
            <h2 className="page-header">All Reviews</h2>
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

export default Reviews;
