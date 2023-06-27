import React, { useEffect, useState } from "react"
import "./Modal.css"
import Badge from "../components/badge/Badge";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { MultiSelect } from "react-multi-select-component";
import callAPI from "../api/api";
import {useForm} from "react-hook-form";

const options = [
    { label: "Sports", value: "Sports" },
    { label: "Music", value: "Music" },
    { label: "Cook", value: "Cook" },
    { label: "Art", value: "Art" },
    { label: "Game Online", value: "Game Online" },
    { label: "Food", value: "Food" },
    { label: "Dance", value: "Dance" },
    { label: "Education", value: "Education" },
    { label: "Fashion", value: "Fashion" },
    { label: "Business", value: "Business" },
    { label: "Others", value: "Others" }

];

const Modal = ({onRequestClose}) => {
    const [startDay, setStartDay] = useState(new Date());
    const [endDay, setEndDay] = useState(new Date());
    const [selected, setSelected] = useState([]);
    const [status, setStatus] = useState();
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        function onKeyDown(event) {
			if (event.keyCode === 27) {
				onRequestClose();
			}
		}
    });

    const onSubmit = (data, event) => {

        const formData = new FormData();
        const title = event.target.title.value
        const price = event.target.price.value
        const organizer = event.target.organizer.value
        const longitude = event.target.longitude.value
        const latitude = event.target.latitude.value
        const address = event.target.address.value
        const introduction = event.target.introduction.value
        const topics = selected.map(item=>item.value)
        const startDate = startDay
        const endDate = endDay

        formData.append("title", title)
        formData.append("price", price)
        formData.append("organizer", organizer)
        formData.append("longitude", longitude)
        formData.append("latitude", latitude)
        formData.append("address", address)
        formData.append("introduction", introduction)
        formData.append("startDate", startDate)
        formData.append("endDate", endDate)
        formData.append("file", data.file[0])
        topics.map(topic => formData.append("topics[]", topic))

        callAPI('post', '/events', formData).then((res)=>{
            setStatus(res.status);
            alert("Create successfully")
            window.location.reload();

        }).catch((err)=>{
            setStatus(400);
        });
    };

    return (
            <div className="modal__backdrop">
                <div className="modal__container">
                    <div className="modal__close" onClick={onRequestClose}>
                        <Badge type="danger" content="Close"/>
                    </div>
                    <form id="create-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
                            <label for="title">Title</label>
                            <input id="title" type="text" name="title" required />

                            <label for="price">Price</label>
                            <input id="price" type="text" name="price" required/>

                            <label for="organizer">Organizer</label>
                            <input id="organizer" type="text" name="organizer" required/>

                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" type="text" name="longitude" required/>

                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" type="text" name="latitude" required/>

                            <label htmlFor="address">Address</label>
                            <input id="address" type="text" name="address" required/>

                            <label htmlFor="address">Introduction</label>
                            <input id="introduction" type="text" name="introduction" required/>

                            <div className="date-picker">
                                <div>
                                    <label for="startDay">Started Date</label>
                                    <DateTimePicker id="startDay" format="dd/MM/yy h:mm:ss a" onChange={setStartDay} value={startDay} name="startDate" required/>
                                </div>
                                <div>
                                    <label for="endDay">Ended Date </label>
                                    <DateTimePicker id="endDay" format="dd/MM/yy h:mm:ss a" onChange={setEndDay} value={endDay} name="endDate" required/>
                                </div>
                            </div>

                            <div className="select-topic">
                                <label for="topics">Topics</label>
                                <div>
                                    <MultiSelect id="topics"
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                    />
                                </div>
                            </div>

                            <div className="modal__image">
                                <div>
                                    <label for="images">Image</label>
                                    <label for="images" class="drop-container">
                                    <input type="file" id="images" accept="image/*" name="files" {...register("file")} required/>
                                    </label>
                                </div>
                            </div>

                            <button className="button-66" type="submit">Submit</button>
                    </form>
                </div>
            </div>
    )
};

export default Modal