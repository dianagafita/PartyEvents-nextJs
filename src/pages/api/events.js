import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const eventId = req.query.eventId;
    console.log("req.query", req.query);

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

      const event = await eventsCollection.findOne({ partyId: eventId });
      console.log(event);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500);
      // .json({ message: "Error fetching event", error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
