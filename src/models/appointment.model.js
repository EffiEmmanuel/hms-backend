import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    },

    date: {
      type: Date,
      required: false,
    },

    time: {
      type: String,
      required: false,
    },

    markedAsDone: {
      type: Boolean,
      default: false,
    },

    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);

export default AppointmentModel;
