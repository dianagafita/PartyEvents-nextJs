import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./EventForm.module.css";

function EditEventForm({ eventId }) {
  const [event, setEvent] = useState({
    title: "",
    image: "",
    date: "",
    description: "",
  });

  const router = useRouter();

  // Fetch event data using the event ID
  useEffect(() => {
    if (eventId) {
      fetch(`/api/events?eventId=${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
        });
    }
  }, [eventId]);
  console.log("e2", eventId);

  const handleEditEvent = async (e) => {
    e.preventDefault();
    // Handle updating the event with the new data
    try {
      const response = await fetch(`/api/editEvent/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      console.log(event);
      if (response.ok) {
        router.push("/events"); // Redirect to event details page after edit
      } else {
        // Handle error scenarios when the update fails
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Function to handle individual state updates
  const handleInputChange = (field, value) => {
    setEvent({ ...event, [field]: value });
  };

  return (
    <form className={classes.form} onSubmit={handleEditEvent}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={event.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          value={event.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="Image URL"
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={event.date}
          onChange={(e) => handleInputChange("date", e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          value={event.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Description"
        ></textarea>
      </p>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditEventForm;
