import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { eventsId } = req.query;
    console.log("req.query", eventsId);

    const client = new MongoClient(
      "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = client.db("parties");
    const collection = db.collection("parties");

    const party = await collection.findOne({ eventsId });

    client.close();
    if (!party) {
      res.status(404).json({ message: "Party not found" });
    } else {
      res.status(200).json(party);
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
