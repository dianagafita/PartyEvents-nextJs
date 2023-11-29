// import { MongoClient } from "mongodb";

// async function handlePutRequest(req, res) {
//   if (req.method === "PUT") {
//     const { eventId } = req.query;
//     console.log("req.query", eventId);

//     const { title, image, date, description } = req.body;

//     const client = new MongoClient(
//       "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     try {
//       await client.connect();
//       const db = client.db("parties");
//       const eventsCollection = db.collection("parties");

//       // Update the event with the provided details
//       const result = await eventsCollection.updateOne(
//         { partyId: eventId }, // Use partyId for updating based on the string identifier
//         { $set: { title, image, date, description } }
//       );

//       if (result.matchedCount > 0) {
//         res.status(200).json({ message: "Event updated" });
//       } else {
//         res.status(404).json({ message: "Event not found" });
//       }
//     } catch (error) {
//       console.error("Error updating event:", error);
//       res.status(500).json({ message: "Could not update event" });
//     } finally {
//       await client.close();
//     }
//   } else if (req.method === "DELETE") {
//     const { eventId } = req.query;
//     console.log("req.query", eventId);

//     const { title, image, date, description } = req.body;

//     const client = new MongoClient(
//       "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     try {
//       await client.connect();
//       const db = client.db("parties");
//       const eventsCollection = db.collection("parties");

//       // Update the event with the provided details
//       const result = await eventsCollection.deleteOne({ partyId });

//       if (result.deletedCount === 1) {
//         res.status(200).json({ message: "Event deleted" });
//       } else {
//         res.status(404).json({ message: "Event not found" });
//       }
//     } catch (error) {
//       console.error("Error updating event:", error);
//       res.status(500).json({ message: "Could not delete event" });
//     } finally {
//       await client.close();
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

// export default handlePutRequest;
import { MongoClient } from "mongodb";

async function handleRequest(req, res) {
  if (req.method === "PUT") {
    const { eventId } = req.query;
    const { title, image, date, description } = req.body;

    // Your PUT logic here using eventId and other fields to update the document
  } else if (req.method === "DELETE") {
    const { eventId } = req.query;

    const client = new MongoClient(
      "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    try {
      await client.connect();
      const db = client.db("parties");
      const eventsCollection = db.collection("parties");

      // Delete the event based on the partyId
      const result = await eventsCollection.deleteOne({ partyId: eventId });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Event deleted" });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Could not delete event" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handleRequest;
