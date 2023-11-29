import classes from "./EventDetail.module.css";

export default function EventDetailPage(props) {
  return (
    <section className={classes.event}>
      <img src={props.image} />
      <h2>{props.title}</h2>
      <p>{props.date}</p>
      <h>{props.description}</h>
    </section>
  );
}
