import Link from "next/link";
import classes from "./EventsNavigation.module.css";

export default function EventNavig(props) {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <Link href="/events">All Events</Link>
            </li>
            <li>
              <Link href="/events/new">New Event</Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* <main className={classes.main}>{props.children}</main> */}
    </>
  );
}
