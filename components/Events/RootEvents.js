import classes from "./RootEvent.module.css";
import EventNavig from "./EventNavig";

export default function RootEvents(props) {
  return (
    <div>
      <EventNavig />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
