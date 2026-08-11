import mongoose from 'mongoose';

const pizzaProductSchema = new mongoose.Schema(
  {
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, required: true },
    crust: { type: String, required: true },
    price: { type: Number, required: true },
    toppings: [{ type: String }],
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('PizzaProduct', pizzaProductSchema);

