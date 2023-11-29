import { useRouter } from "next/router"; // Ensure the correct import statement

import EditEventForm from "../../../../components/Events/EditEventForm";

function EditEventPage() {
  const router = useRouter();
  const userRole = localStorage.getItem("role"); // Get the user role from local storage

  // Perform role-based checks
  if (userRole !== "admin") {
    // Redirect the user to the unauthorized page if they don't have the necessary role
    router.push("/unouth");
    // return <UnPage />;
  }

  const { eventId } = router.query; // Retrieve the 'id' from the router query
  console.log("ev", eventId);
  // Check if 'id' is present or not before rendering the component
  if (!eventId) {
    return <div>Loading...</div>; // Or handle the scenario when 'id' is not available
  }

  return (
    <div>
      <h1>Edit Event {eventId}</h1>
      <EditEventForm eventId={eventId} />
      {/* Pass the event ID to the form component */}
    </div>
  );
}

export default EditEventPage;
