import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, isLogin } = req.body;

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
      const users = db.collection("users");

      if (isLogin) {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
          const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (isPasswordValid) {
            res.status(200).json({
              message: "Login successful",
              role: existingUser.role,
            });
            res.status(200).json({ message: "Login successful" });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        } else {
          res.status(401).json({ message: "User not found" });
        }
      } else {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
          res.status(400).json({ message: "User already exists" });
          return;
        } else {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = {
            email,
            password: hashedPassword,
            role: "user",
          };

          await users.insertOne(newUser);
          res.status(201).json({ message: "User created" });
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
