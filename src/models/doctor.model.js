import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

export default DoctorModel;
