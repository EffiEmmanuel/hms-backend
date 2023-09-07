import express from "express";
import {
  createAppointment,
  createPatient,
  createVisit,
  deleteAppointment,
  deleteDoctorById,
  deletePatient,
  deleteVisit,
  getAppointmentById,
  getDoctorAppointments,
  getDoctorByEmail,
  getDoctorById,
  getDoctorStats,
  getPatient,
  getPatientAppointments,
  getPatientVisits,
  getPatientVisitsByPatientId,
  getPatients,
  getVisitById,
  getVisits,
  loginDoctor,
  signupDoctor,
  updateAppointment,
  updateDoctorById,
  updatePatient,
  updateVisit,
} from "../controllers/doctor.controller.js";
import { verifyUserToken } from "../util/auth.helper.js";

const doctorRouter = express.Router();

// Routes
doctorRouter.post("/login", loginDoctor);
doctorRouter.post("/signup", signupDoctor);
doctorRouter.get("/get-doctor-by-email", getDoctorByEmail);
doctorRouter.get("/get-doctor/:doctorId", getDoctorById);
doctorRouter.delete("/delete/:doctorId", deleteDoctorById);
doctorRouter.patch("/update/:doctorId", updateDoctorById);

// PATIENTS
doctorRouter.post("/patients/create", createPatient);
doctorRouter.get("/patients/get-patient/:patientId", getPatient);
doctorRouter.get("/patients/get-patients", getPatients);
doctorRouter.get(
  "/patients/get-patients-visits/:patientId",
  getPatientVisitsByPatientId
);
doctorRouter.patch("/patients/update/:patientId", updatePatient);
doctorRouter.delete("/patients/delete/:patientId", deletePatient);

// VISITS
doctorRouter.post("/visits/create/:doctorId/:patientId", createVisit);
doctorRouter.get("/visits/get-patient-visits/:patientId", getPatientVisits);
doctorRouter.get("/visits/get-visits/:doctorId", getVisits);
doctorRouter.get("/visits/get-visit/:visitId", getVisitById);
doctorRouter.patch("/visits/update/:visitId", updateVisit);
doctorRouter.delete("/visits/delete/:visitId", deleteVisit);

// APPOINTMENTS
doctorRouter.post(
  "/appointments/create/:doctorId/:patientId",
  createAppointment
);
doctorRouter.get(
  "/appointments/get-patient-appointments/:patientId",
  getPatientAppointments
);
doctorRouter.get(
  "/appointments/get-doctor-appointments/:doctorId",
  getDoctorAppointments
);
doctorRouter.get(
  "/appointments/get-appointment/:appointmentId",
  getAppointmentById
);
doctorRouter.patch("/appointments/update/:appointmentId", updateAppointment);
doctorRouter.delete("/appointments/delete/:appointmentId", deleteAppointment);

// STATS
doctorRouter.get("/statistics/:doctorId", getDoctorStats);

export default doctorRouter;
