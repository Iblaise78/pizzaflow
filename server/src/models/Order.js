import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    category: Object,
    size: Object,
    base: Object,
    sauce: Object,
    cheese: Object,
    vegetables: [Object],
    toppings: [Object],
    drinks: [Object],
    sides: [Object],
    desserts: [Object],
    quantity: { type: Number, default: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customer: {
      fullName: String,
      email: String,
      phone: String,
      city: String,
      address: String,
      notes: String
    },
    items: orderItemSchema,
    subtotal: Number,
    discount: Number,
    deliveryFee: Number,
    tax: Number,
    total: Number,
    couponCode: String,
    deliveryNotes: String,
    ageConfirmed: { type: Boolean, default: false },
    paymentMethod: String,
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Preparing', 'Baking', 'Out for Delivery', 'Delivered', 'Cancelled', 'Order Received', 'In Kitchen', 'Sent to Delivery'],
      default: 'Pending'
    },
    deliveryAddress: { type: String, required: true },
    paymentId: String,
    razorpayOrderId: String
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
