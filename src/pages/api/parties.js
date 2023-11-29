import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

async function handlePostRequest(req, res) {
  if (req.method === "POST") {
    const { title, image, date, description } = req.body;

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

      const newEvent = {
        partyId: uuidv4(),
        title,
        image,
        date,
        description,
      };

      const result = await eventsCollection.insertOne(newEvent);

      res
        .status(201)
        .json({ message: "Event added", eventId: result.insertedId });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Could not add event" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handlePostRequest;
