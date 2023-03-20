const express = require("express");
const app = express();
const mongoose = require("mongoose");
const FoodModel = require("./Food");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const url = process.env.ATLAS_URL;
mongoose.set("strictQuery", false);

mongoose.connect(url, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const daysAte = req.body.daysAte;
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: daysAte });
  try {
    await food.save();
    res.json(food);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create food item" });
  }
});

app.get("/read", async (req, res) => {
  try {
    const result = await FoodModel.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

app.put("/update", async (req, res) => {
  const newfname = req.body.newfname;
  const id = req.body.id;

  try {
    const updatedFood = await FoodModel.findOneAndUpdate(
      { _id: id },
      { foodName: newfname },
      { new: true }
    );
    res.send(updatedFood);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update food item" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("listening to 3001");
});
