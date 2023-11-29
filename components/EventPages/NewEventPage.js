// Example in a protected route or component
import { useRouter } from "next/router";
import UnPage from "../../src/pages/unouth";
import EventForm from "../Events/EventForm";
import { useEffect } from "react";

export default function NewEventPage() {
  const router = useRouter();
  useEffect(() => {
    const userRole = localStorage.getItem("role"); // Get the user role from local storage

    // Perform role-based checks
    if (userRole !== "admin") {
      // Redirect the user to the unauthorized page if they don't have the necessary role
      router.push("/unouth");
      // return <UnPage />;
    }
  }, []);

  return <EventForm />;
}
