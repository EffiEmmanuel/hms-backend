import axios from "axios";
import DoctorModel from "../models/doctor.model.js";
import DoctorService from "../service/DoctorService.js";
import { jwtSign } from "../util/auth.helper.js";
import VisitService from "../service/VisitService.js";
import VisitModel from "../models/visit.model.js";
import PatientService from "../service/PatientService.js";
import PatientModel from "../models/patient.model.js";
import AppointmentService from "../service/AppointmentService.js";
import AppointmentModel from "../models/appointment.model.js";
// Generic messages
const internalServerError =
  "An error occured while we processed your request. Please try again.";

// SERVICE INSTANCES
// Create a new DoctorService instance
const doctorService = new DoctorService(DoctorModel);
const patientService = new PatientService(PatientModel);
const visitService = new VisitService(VisitModel);
const appointmentService = new AppointmentService(AppointmentModel);

// Sign up doctor
export const signupDoctor = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Create new doctor
    const doctor = await doctorService.signupDoctor({
      firstName,
      lastName,
      email,
      password,
    });

    // Return a response
    return res
      .status(doctor?.status)
      .json({ doctor: doctor?.doctor ?? null, message: doctor?.message });
  } catch (error) {
    console.log("ERR:", error.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// Log in doctor
export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Log in doctor
    const doctor = await doctorService.loginDoctor(email, password);

    // Return a response
    return res.status(doctor?.status).json({
      doctor: doctor?.doctor ?? null,
      token: doctor?.token,
      message: doctor?.message,
    });
  } catch (error) {
    console.log("ERRR:", error.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// Get doctor by email
export const getDoctorByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch doctor
    const doctor = await doctorService.getDoctorByEmail(email);

    // Return a response
    return res
      .status(doctor?.status)
      .json({ doctor: doctor?.doctor ?? null, message: doctor?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Get doctor by _id
export const getDoctorById = async (req, res) => {
  const { _id } = req.body;

  try {
    // Fetch doctor
    const doctor = await doctorService.getDoctorById(_id);

    // Return a response
    return res
      .status(doctor?.status)
      .json({ doctor: doctor?.doctor ?? null, message: doctor?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Delete doctor by id
export const deleteDoctorById = async (req, res) => {
  const { _id } = req.body;
  try {
    // DELETE doctor
    const doctor = await doctorService.deleteDoctorById(_id);

    // Return a response
    return res
      .status(doctor?.status)
      .json({ doctor: doctor?.doctor ?? null, message: doctor?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update doctor by id
export const updateDoctorById = async (req, res) => {
  const { doctorId } = req.params;
  console.log("did:", doctorId);
  try {
    // UPDATE doctor
    const doctor = await doctorService.updateDoctorById(doctorId, req.body);

    // Return a response
    return res
      .status(doctor?.status)
      .json({ doctor: doctor?.doctor ?? null, message: doctor?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// PATIENTS
// Creates a patient
export const createPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    email,
    gender,
    dateOfBirth,
    bloodGroup,
    height,
    weight,
    profession,
    location,
    address,
    telephoneNumber,
  } = req.body;

  try {
    // CREATE patient
    const response = await patientService.createPatient(
      firstName,
      lastName,
      middleName,
      email,
      gender,
      dateOfBirth,
      bloodGroup,
      height,
      weight,
      profession,
      location,
      address,
      telephoneNumber
    );

    // Return a response
    return res
      .status(response?.status)
      .json({ patient: response?.patient ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets a patient by id
export const getPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    // GET patient by id
    const response = await patientService.getPatient(patientId);

    // Return a response
    return res
      .status(response?.status)
      .json({ patient: response?.patient ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets all patients
export const getPatients = async (req, res) => {
  const { page, limit } = req.query;
  try {
    // GET patients
    const response = await patientService.getPatients(page, limit);

    // Return a response
    return res.status(response?.status).json({
      patients: response?.patients ?? null,
      message: response?.message,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets a patient's visits
export const getPatientVisitsByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    // GET patient visits
    const response = await patientService.getPatientVisits(patientId);

    // Return a response
    return res
      .status(response?.status)
      .json({ visits: response?.visits ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update a patient
export const updatePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    // UPDATE patient
    const response = await patientService.updatePatientById(
      patientId,
      req.body
    );

    // Return a response
    return res
      .status(response?.status)
      .json({ patient: response?.patient ?? null, message: response?.message });
  } catch (error) {
    console.log("ERROR:::", error?.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// DELETE a patient
export const deletePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    // DELETE patient
    const response = await patientService.deletePatientById(patientId);

    // Return a response
    return res
      .status(response?.status)
      .json({ patient: response?.patient ?? null, message: response?.message });
  } catch (error) {
    console.log("ERROR:::", error?.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// VISITS
// Creates a visit
export const createVisit = async (req, res) => {
  const { doctorId, patientId } = req.params;
  const { rentgen, ct, echo, analysis, type, drugs, injections, diagnosis } =
    req.body;

  try {
    // UPDATE resume
    const response = await visitService.createVisit(
      doctorId,
      patientId,
      rentgen,
      ct,
      echo,
      analysis,
      type,
      drugs,
      injections,
      diagnosis
    );

    console.log("FOLDER;", response.visit);

    // Return a response
    return res
      .status(response?.status)
      .json({ visit: response?.visit ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets a patient's visits
export const getPatientVisits = async (req, res) => {
  const { patientId } = req.params;

  try {
    // GET patient visits
    const response = await visitService.getPatientVisits(patientId);

    // Return a response
    return res
      .status(response?.status)
      .json({ visits: response?.visits ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets all visits
export const getVisits = async (req, res) => {
  const { doctorId } = req.params;
  const { page, limit } = req.query;

  try {
    // GET visits
    const response = await visitService.getVisits(doctorId, page, limit);

    // Return a response
    return res
      .status(response?.status)
      .json({ visits: response?.visits ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets visit by id
export const getVisitById = async (req, res) => {
  const { visitId } = req.params;

  try {
    // GET visit by id
    const response = await visitService.getVisitById(visitId);

    // Return a response
    return res
      .status(response?.status)
      .json({ visit: response?.visit ?? null, message: response?.message });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update a visit
export const updateVisit = async (req, res) => {
  const { visitId } = req.params;

  try {
    // UPDATE visit
    const response = await visitService.updateVisitById(visitId, req.body);

    // Return a response
    return res
      .status(response?.status)
      .json({ visit: response?.visit ?? null, message: response?.message });
  } catch (error) {
    console.log("ERROR:::", error?.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// DELETE a visit
export const deleteVisit = async (req, res) => {
  const { visitId } = req.params;

  try {
    // DELETE visit
    const response = await visitService.deleteVisitById(visitId);

    // Return a response
    return res
      .status(response?.status)
      .json({ visit: response?.visit ?? null, message: response?.message });
  } catch (error) {
    console.log("ERROR:::", error?.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// APPOINTMENTS
// Creates an appointment
export const createAppointment = async (req, res) => {
  const { doctorId, patientId } = req.params;
  const { date, time } = req.body;

  try {
    // UPDATE appointment
    const response = await appointmentService.createAppointment(
      patientId,
      doctorId,
      date,
      time
    );

    // Return a response
    return res.status(response?.status).json({
      appoimtment: response?.appoimtment ?? null,
      message: response?.message,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets all doctors appointments
export const getDoctorAppointments = async (req, res) => {
  const { doctorId } = req.params;
  const { page, limit } = req.query;

  try {
    // GET appointments
    const response = await appointmentService.getAppointments(
      doctorId,
      page,
      limit
    );

    // Return a response
    return res.status(response?.status).json({
      appointments: response?.appointments ?? null,
      message: response?.message,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets all doctors appointments
export const getDoctorStats = async (req, res) => {
  const { doctorId } = req.params;

  try {
    // GET appointments
    const appointmentResponse = await appointmentService.getAppointments(
      doctorId,
      1,
      20000
    );

    // GET visits
    const visitResponse = await visitService.getVisits(doctorId, 1, 20000);

    // GET patients
    const patientResponse = await patientService.getPatients(1, 20000);

    // Return a response
    return res.status(appointmentResponse?.status).json({
      appointments: appointmentResponse?.appointments?.length ?? null,
      visits: visitResponse?.visits?.length ?? null,
      patients: patientResponse?.patients?.length ?? null,
      message:
        appointmentResponse?.message ??
        visitResponse?.message ??
        patientResponse?.message,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets appointment by id
export const getAppointmentById = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    // GET appointment by id
    const response = await appointmentService.getAppointment(appointmentId);

    // Return a response
    return res.status(response?.status).json({
      appointment: response?.appointment ?? null,
      message: response?.message,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Gets a patient's appointments
export const getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;

  try {
    // GET patient appointments
    const response = await appointmentService.getPatientAppointments(patientId);

    // Return a response
    return res.status(response?.status).json({
      appointments: response?.appointments ?? null,
      message: response?.message,
    });
  } catch (error) {
    return res.status(500).json({ message: internalServerError });
  }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    // UPDATE visit
    const response = await appointmentService.updateAppointmentById(
      appointmentId,
      req.body
    );

    // Return a response
    return res.status(response?.status).json({
      appointment: response?.appointment ?? null,
      message: response?.message,
    });
  } catch (error) {
    console.log("ERROR:::", error?.message);
    return res.status(500).json({ message: internalServerError });
  }
};

// DELETE an appointment
export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    // DELETE appointment
    const response = await appointmentService.deleteAppointmentById(
      appointmentId
    );

    // Return a response
    return res.status(response?.status).json({
      appointment: response?.appointment ?? null,
      message: response?.message,
    });
  } catch (error) {
    console.log("ERROR:::", error?.message);
    return res.status(500).json({ message: internalServerError });
  }
};
