import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://diana:diana@atlascluster.qc6evfi.mongodb.net/parties?retryWrites=true&w=majority"
    );
    const db = client.db("parties");
    const collection = db.collection("parties");

    const parties = await collection
      .find({}, { projection: { partyId: 1 } })
      .toArray();

    client.close();
    res.status(200).json(parties);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
