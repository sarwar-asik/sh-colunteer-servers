const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sh volunteer server running ");
});

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.ysfeeva.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const cardCollection = client.db("sh-volunteer").collection("addCard");

  app.post("/addCard", async (req, res) => {
    const card = req.body;
    console.log(card);
    const result = await cardCollection.insertOne(card);
    res.send(result);
  });

  app.get("/cards", async (req, res) => {
    const cursor = cardCollection.find({});
    const cards = await cursor.toArray();
    // console.log(cards);
    res.send(cards);
  });


  app.delete('/cards/:id',async(req,res)=>{
const id = req.params.id

console.log('delete..........');
  })
}

run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Sh volunteer server running on ${port}`);
});
