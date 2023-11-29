// import { Router } from "next/router";
// import classes from "./EventForm.module.css";

// function EventForm({ method, event }) {
//   function cancelHandler() {
//     Router("/");
//   }

//   return (
//     <form className={classes.form}>
//       <p>
//         <label htmlFor="title">Title</label>
//         <input id="title" type="text" name="title" required />
//       </p>
//       <p>
//         <label htmlFor="image">Image</label>
//         <input id="image" type="url" name="image" required />
//       </p>
//       <p>
//         <label htmlFor="date">Date</label>
//         <input id="date" type="date" name="date" required />
//       </p>
//       <p>
//         <label htmlFor="description">Description</label>
//         <textarea id="description" name="description" rows="5" required />
//       </p>
//       <div className={classes.actions}>
//         <button type="button" onClick={cancelHandler}>
//           Cancel
//         </button>
//         <button>Save</button>
//       </div>
//     </form>
//   );
// }

// export default EventForm;
import { useState } from "react";
import { Router, useRouter } from "next/router";
import classes from "./EventForm.module.css";

function EventForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function cancelHandler() {
    router.push("/");
  }

  async function saveHandler(event) {
    event.preventDefault();

    const newEvent = {
      title,
      image,
      date,
      description,
    };

    try {
      const response = await fetch("/api/parties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        router.push("/events");
      } else {
        throw new Error("Failed to add new event");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show a message, etc.
    }
  }

  return (
    <form className={classes.form} onSubmit={saveHandler}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default EventForm;
