import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { Router, useRouter } from "next/router";

export default function MainNavigation() {
  const router = useRouter();
  const handleLogoutButton = () => {
    localStorage.removeItem("role");
    router.push("/");
  };
  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/authentification">Authentication</Link>
        </li>
        <li>
          <Link href="/newevent">Add New Event</Link>
        </li>
      </ul>
      <button onClick={handleLogoutButton}>Logout</button>
    </header>
  );
}
