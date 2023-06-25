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
        <>
            <div className="modal__backdrop">
                <div className="modal__container">
                    <div className='cursor_pointer' onClick={onRequestClose}>
                <Badge type="danger" content="Close"/></div>
                <form action="" id="survey-form">
                        <label for="new-task">Title</label>
                        <input id="new-task" type="text"/>

                        <label for="price">price</label>
                        <input id="price" type="text"/>

                        <div className="date-picker">
                            <div>
                                <label for="new-task">Started Date</label>
                                <DateTimePicker  format="dd/MM/yy h:mm:ss a" onChange={setStartDay} value={startDay} />
                            </div>
                            <div>
                                <label for="new-task">Ended Date</label>
                                <DateTimePicker  format="dd/MM/yy h:mm:ss a" onChange={setEndDay} value={endDay} />
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

                        <div className="quan">
                            <div>
                                <label for="new-task">Image</label>
                                <label for="images" class="drop-container">
                                <input type="file" id="images" accept="image/*" required/>
                                </label>
                            </div>
                        </div>

                        <button className="button-66" >Submit</button>
                </form>
                </div>
            </div>
        
        </>
    )
};

export default Modal