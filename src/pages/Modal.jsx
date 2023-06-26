import React, { useEffect, useState } from "react"
import "./Modal.css"
import Badge from "../components/badge/Badge";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { MultiSelect } from "react-multi-select-component";
import callAPI from "../api/api";
import {useHistory} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";

const options = [
    { label: "Sports", value: "Sports" },
    { label: "Music", value: "Music" },
    { label: "Cook", value: "Cook" },
    { label: "Art", value: "Art" },
    { label: "Game Online", value: "Game Online" },
    { label: "Food", value: "Food" },
    { label: "Dance", value: "Dance" },
    { label: "Others", value: "Others" }
];

const Modal = ({onRequestClose}) => {
    const [startDay, setStartDay] = useState(new Date());
    const [endDay, setEndDay] = useState(new Date());
    const [selected, setSelected] = useState([]);
    const history = useHistory();
    const [status, setStatus] = useState();
    const { register, handleSubmit, control } = useForm();

    useEffect(() => {
        function onKeyDown(event) {
			if (event.keyCode === 27) {
				onRequestClose();
			}
		}
    });

    // const createNewEvent = async (event) => {
    //     event.preventDefault()
    //     const title = event.target.title.value
    //     const price = event.target.price.value
    //     const organizer = event.target.organizer.value
    //     const longitude = event.target.longitude.value
    //     const latitude = event.target.latitude.value
    //     const address = event.target.address.value
    //     const introduction = event.target.introduction.value
    //     const started_date = event.target.started_date.value
    //     const ended_date = event.target.ended_date.value
    //     const files = event.target.files.value
    //     const topics = selected.map(item=> item.value)
    //
    //     event.target.title.value = ""
    //     event.target.price.value = ""
    //     event.target.organizer.value = ""
    //     event.target.longitude.value = ""
    //     event.target.latitude.value = ""
    //     event.target.address.value = ""
    //     event.target.introduction.value = ""
    //     event.target.started_date.value = ""
    //     event.target.ended_date.value = ""
    //     event.target.files.value = ""
    //
    //     const newEvent = {
    //         title: title,
    //         price: price,
    //         user_id: organizer,
    //         longitude: longitude,
    //         latitude: latitude,
    //         address: address,
    //         introduction: introduction,
    //         topics: topics,
    //         started_date: started_date,
    //         ended_date: ended_date,
    //         // files: files
    //     }
    //
    //     console.log(newEvent)
    //     callAPI('post', '/events', newEvent).then((res)=>{
    //         history.push('/dashboard');
    //     }).catch((err)=>{
    //         setStatus(400);
    //     });
    //
    // }

    const onSubmit = data => {
        let formData = new FormData();
        formData = {...data}
        console.log(formData)

        callAPI('post', '/events', formData).then((res)=>{
            setStatus(res.status);
            history.push('/dashboard');
        }).catch((err)=>{
            setStatus(401);
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
                            <input id="title" type="text" name="title"  {...register("title", { required: true })} />

                            <label for="price">Price</label>
                            <input id="price" type="text" name="price"  {...register("price", { required: true })}/>

                            <label for="organizer">Organizer</label>
                            <input id="organizer" type="text" name="organizer"  {...register("user_id", { required: true })}/>

                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" type="text" name="longitude" {...register("longitude", { required: true })} />

                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" type="text" name="latitude" {...register("latitude", { required: true })} />

                            <label htmlFor="address">Address</label>
                            <input id="address" type="text" name="address" {...register("address", { required: true })} />

                            <label htmlFor="address">Introduction</label>
                            <input id="introduction" type="text" name="introduction" {...register("introduction", { required: true })} />

                            <div className="date-picker">
                                <div>
                                    <label for="startDay">Started Date</label>
                                    <Controller
                                        control={control}
                                        name="started_date"
                                        render={({ field: {  onBlur } }) => (
                                            <DateTimePicker id="startDay" format="yy/MM/dd h:mm:ss a" onChange={setStartDay} value={startDay} onBlur={onBlur}
                                            />
                                        )}
                                    />

                                </div>
                                <div>
                                    <label for="endDay">Ended Date</label>
                                    <Controller
                                        control={control}
                                        name="ended_date"
                                        render={({ field: {  onBlur } }) => (
                                            <DateTimePicker id="endDay" format="yy/MM/dd h:mm:ss a" onChange={setEndDay} value={endDay} name="ended_date" onBlur={onBlur}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="select-topic">
                                <label for="topics">Topics</label>
                                <div>
                                    <Controller
                                        control={control}
                                        name="topics"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <MultiSelect id="topics"
                                                         options={options}
                                                         value={selected}
                                                         onChange={setSelected}
                                                         labelledBy="Select"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="modal__image">
                                <div>
                                    <label for="images">Image</label>
                                    <label for="images" class="drop-container">
                                    <input type="file" id="images" accept="image/*" name="files" {...register("file", { required: true })}/>
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