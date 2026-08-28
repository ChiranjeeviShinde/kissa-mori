import mongoose from "mongoose";

const CoffeeSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  stock: Number,
});

export default mongoose.models.Coffee || mongoose.model("Coffee", CoffeeSchema);
