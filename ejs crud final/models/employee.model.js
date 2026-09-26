import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: Boolean,
      default: true,
    },

    created_date: {
      type: Date,
      default: Date.now,
    },

    updated_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  },
);

const employeeModel = mongoose.model("Employee", employeeSchema);

export default employeeModel;
