import mongoose from "mongoose";

const CoffeeSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  stock: Number,
  ingredients: String,
  size: Number,
  cal: Number,
  rating: Number,
});

export default mongoose.models.Coffee || mongoose.model("Coffee", CoffeeSchema);
