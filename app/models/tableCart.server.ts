import mongoose from "mongoose";

const TableCartItemSchema = new mongoose.Schema(
  {
    coffeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coffee",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const TableCartSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
      unique: true,
    },

    items: {
      type: [TableCartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.TableCart ||
  mongoose.model("TableCart", TableCartSchema);
