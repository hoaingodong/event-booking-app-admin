import React, { useEffect, useState } from "react"
import "./Modal.css"
import Badge from "../components/badge/Badge";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { MultiSelect } from "react-multi-select-component";

const options = [
    { label: "Sports", value: "Sports" },
    { label: "Music", value: "Music" },
    { label: "Cook", value: "Cook" },
    { label: "Art", value: "Art" },
    { label: "Game Online", value: "Game Online" },
    { label: "Food", value: "Food" },
    { label: "Music", value: "Music" },
    { label: "Dance", value: "Dance" },
    { label: "Others", value: "Others" }
];

const Modal = ({onRequestClose}) => {
    const [startDay, setStartDay] = useState(new Date());
    const [endDay, setEndDay] = useState(new Date());

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        function onKeyDown(event) {
			if (event.keyCode === 27) {
				onRequestClose();
			}
		}
    });

    return (
            <div className="modal__backdrop">
                <div className="modal__container">
                    <div className="modal__close" onClick={onRequestClose}>
                        <Badge type="danger" content="Close"/>
                    </div>
                    <form action="" id="create-form">
                            <label for="title">Title</label>
                            <input id="title" type="text"/>

                            <label for="price">price</label>
                            <input id="price" type="text"/>

                            <div className="date-picker">
                                <div>
                                    <label for="startDay">Started Date</label>
                                    <DateTimePicker id="startDay" format="dd/MM/yy h:mm:ss a" onChange={setStartDay} value={startDay} />
                                </div>
                                <div>
                                    <label for="endDay">Ended Date</label>
                                    <DateTimePicker id="endDay" format="dd/MM/yy h:mm:ss a" onChange={setEndDay} value={endDay} />
                                </div>
                            </div>

                            <div className="select-topic">
                                <label for="topics">Topics</label>
                                <div>
                                    <MultiSelect
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
                                    <input type="file" id="images" accept="image/*" required/>
                                    </label>
                                </div>
                            </div>

                            <button className="button-66" >Submit</button>
                    </form>
                </div>
            </div>
    )
};

export default Modal