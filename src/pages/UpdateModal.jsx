import React, { useEffect, useState } from "react";
import "./Modal.css";
import Badge from "../components/badge/Badge";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { MultiSelect } from "react-multi-select-component";
import callAPI from "../api/api";
import { useForm } from "react-hook-form";

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
  { label: "Others", value: "Others" },
];


const Modal = ({ onRequestClose, eventDetail }) => {
  
  console.log(eventDetail)
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [selected, setSelected] = useState([]);
  console.log(selected)
  const [status, setStatus] = useState();
  const { register, handleSubmit } = useForm();

  const topicsOption = (eventDetail) => {
    const topicsEvent = eventDetail?.topics.map((item) => ({ label: item, value: item }))
    setSelected(topicsEvent)
    console.log(topicsEvent, eventDetail)
  }
  function onKeyDown(event) {
    if (event.keyCode === 27) {
      onRequestClose();
    }
  }

  useEffect(() => {
    if (eventDetail) 
    {
    topicsOption(eventDetail)}
  }, [eventDetail]);

  const onSubmit = (data, event) => {
    const editEvent = {
      title: event.target.title.value,
      price: event.target.price.value,
      longitude: event.target.longitude.value,
      latitude: event.target.latitude.value,
      address: event.target.address.value,
      introduction: event.target.introduction.value,
      topics: selected.map((item) => item.value),
      startDate: startDay,
      endDate: endDay,
    };

    callAPI("put", `/events/${eventDetail.id}`, editEvent)
      .then((res) => {
        setStatus(res.status);
        alert("Edit successfully");
        window.location.reload();
      })
      .catch((err) => {
        setStatus(400);
      });
  };

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <div className="modal__close" onClick={onRequestClose}>
          <Badge type="danger" content="Close" />
        </div>
        <form id="create-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={eventDetail?.title}
            required
          />

          <label for="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            defaultValue={eventDetail?.price}
            required
          />

          <label for="organizer">Organizer</label>
          <input
            id="organizer"
            type="text"
            name="organizer"
            defaultValue={eventDetail?.organizer.name}
            disabled
            required
          />

          <label htmlFor="longitude">Longitude</label>
          <input
            id="longitude"
            type="number"
            name="longitude"
            defaultValue={eventDetail?.location?.coordinates[0]}
            required
          />

          <label htmlFor="latitude">Latitude</label>
          <input
            id="latitude"
            type="number"
            name="latitude"
            defaultValue={eventDetail?.location?.coordinates[1]}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            defaultValue={eventDetail?.address}
            required
          />

          <label htmlFor="address">Introduction</label>
          <textarea
            id="introduction"
            type="text"
            name="introduction"
            defaultValue={eventDetail?.introduction}
            required
          />

          <div className="date-picker">
            <div>
              <label for="startDay">Started Date</label>
              <DateTimePicker
                id="startDay"
                format="dd/MM/yy h:mm:ss a"
                onChange={setStartDay}
                value={startDay}
                name="startDate"
                defaultValue={eventDetail?.startDate}
                required
              />
            </div>
            <div>
              <label for="endDay">Ended Date </label>
              <DateTimePicker
                id="endDay"
                format="dd/MM/yy h:mm:ss a"
                onChange={setEndDay}
                value={endDay}
                name="endDate"
                defaultValue={eventDetail?.endDate}
                required
              />
            </div>
          </div>

          <div className="select-topic">
            <label for="topics">Topics</label>
            <div>
              <MultiSelect
                id="topics"
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
              <label for="images" className="drop-container">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  name="files"
                  {...register("file")}
                  disabled
                  required
                />
              </label>
            </div>
          </div>

          <button className="button-66" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
