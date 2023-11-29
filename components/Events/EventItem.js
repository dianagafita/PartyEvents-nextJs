import { useRouter } from "next/router";
import { Fragment } from "react";
import classes from "./EventsList.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

function EventItem({ parties }) {
  const router = useRouter();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role"); // Get the user role from local storage
    setUserRole(role);
  }, []);

  const handleDelete = async (eventId) => {
    console.log(eventId);
    try {
      const response = await fetch(`/api/editEvent/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/events");
      } else {
        // Handle the error, e.g., show an alert
        console.error("Error deleting event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Fragment>
      <ul className={classes.list}>
        {parties.map((event) => (
          <li key={event.partyId} className={classes.item}>
            <Link href={`/events/${event.partyId}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
            {userRole === "admin" && (
              <Link href={`/editevent/${event.partyId}`}>Edit Event</Link>
            )}
            {userRole === "admin" && (
              <div className={classes.actions}>
                <button onClick={() => handleDelete(event.partyId)}>
                  Delete Party
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default EventItem;
