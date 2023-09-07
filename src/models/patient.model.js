import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
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
      unique: false,
    },

    middleName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    profession: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    telephoneNumber: {
      type: String,
      required: true,
    },

    visits: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Visit",
      },
    ],
  },
  { timestamps: true }
);

const PatientModel = mongoose.model("Patient", PatientSchema);

export default PatientModel;
