import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema(
  {
    rentgen: [
      {
        type: String,
      },
    ],

    ct: [
      {
        type: String,
      },
    ],

    echo: [
      {
        type: String,
      },
    ],

    analysis: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    drugs: {
      type: String,
      required: false,
    },

    injections: {
      type: String,
    },

    diagnosis: {
      type: String,
    },

    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    },

    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

const VisitModel = mongoose.model("Visit", VisitSchema);

export default VisitModel;
