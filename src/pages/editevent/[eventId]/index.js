import { useRouter } from "next/router";
import EditEventForm from "../../../../components/Events/EditEventForm";
import { useEffect } from "react";

function EditEventPage() {
  const router = useRouter();
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole !== "admin") {
      router.push("/unouth");
    }
  }, []);

  const { eventId } = router.query;
  console.log("ev", eventId);
  if (!eventId) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Edit Event {eventId}</h1>
      <EditEventForm eventId={eventId} />
    </div>
  );
}

export default EditEventPage;
