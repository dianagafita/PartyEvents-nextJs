import MainNavigation from "./MainNavigation";
import classes from "./Root.module.css";

export default function Root(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
