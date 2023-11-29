import EventItem from "./EventItem";
import classes from "./EventsList.module.css";
import Link from "next/link";
function EventsList(props) {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <EventItem />
    </div>
  );
}

export default EventsList;
