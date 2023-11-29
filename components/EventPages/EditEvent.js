import { useState } from "react";
import { useRouter } from "next/router";

function EventForm() {
  const router = useRouter();

  const [event, setEvent] = useState({
    title: "",
    image: "",
    date: "",
    description: "",
  });

  const handleEditEvent = async (event) => {
    event.preventDefault();

    const eventId = router.query.id; // Retrieve event ID from the router

    try {
      const response = await fetch(`/api/parties/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event), // Pass updated event details to the API
      });

      if (response.ok) {
        // Handle successful update, for instance, navigate to the event's page
        router.push(`/events/${eventId}`);
      } else {
        // Handle error scenarios
        // Show an alert or handle the error as needed
      }
    } catch (error) {
      // Handle fetch or other runtime errors
      console.error("Error updating event:", error);
    }
  };

  return (
    <form onSubmit={handleEditEvent}>
      {/* Form inputs for event details */}
      <input
        type="text"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event.image}
          required
          onChange={(e) => setEvent({ ...event, image: e.target.value })}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          id="date"
          type="date"
          name="date"
          defaultValue={event.date}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          id="description"
          name="description"
          rows="5"
          defaultValue={event.description}
          required
        />
      </p>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EventForm;
