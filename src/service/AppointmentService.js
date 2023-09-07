import bcrypt from "bcryptjs";
import { validateFields, jwtSign } from "../util/auth.helper.js";

export default class AppointmentService {
  constructor(InternistikaAppointmentModel) {
    this.AppointmentModel = InternistikaAppointmentModel;
  }

  // This service CREATES a new appointment
  async createAppointment(patientId, doctorId, date, time) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([patientId, doctorId, date, time]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // If the email is available, then proceed to sign up the appointment
    const newAppointment = await this.AppointmentModel.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
    });

    return {
      status: 201,
      message: "Appointment was created successfully!",
      appointment: newAppointment,
    };
  }

  // This service GETS a appointment by Id
  async getAppointment(appointmentId) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([appointmentId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any appointment exists
    const appointment = await this.AppointmentModel.find({
      _id: appointmentId,
    });

    if (!appointment) {
      return {
        status: 404,
        message: "No appointment exists with the id.",
      };
    }

    return {
      status: 200,
      message: `Fetched appointment.`,
      appointment: appointment,
    };
  }

  // This service GETS appointmentS
  async getAppointments(doctorId, page, limit) {
    const skip = (page - 1) * limit;
    // Check if any appointment exists
    const appointments = await this.AppointmentModel.find({
      doctor: doctorId,
      markedAsDone: false,
    })
      .skip(skip)
      .limit(limit)
      .populate("patient");

    if (!appointments) {
      return {
        status: 404,
        message: "No appointments exists.",
      };
    }

    return {
      status: 200,
      message: `Fetched appointments.`,
      appointments: appointments,
    };
  }

  // This service GETS All appointmentS
  async getDoctorAppointments(doctorId, page, limit) {
    // Check if any appointment exists
    const appointments = await this.AppointmentModel.find({
      doctor: doctorId,
      markedAsDone: false,
    });

    if (!appointments) {
      return {
        status: 404,
        message: "No appointments exists.",
      };
    }

    return {
      status: 200,
      message: `Fetched appointments.`,
      appointments: appointments,
    };
  }

  // This service GETS a patient's appointments
  async getPatientAppointments(patientId) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([patientId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any appointment exists with the patientId
    const appointments = await this.AppointmentModel.find({
      patient: patientId,
    });

    if (!appointments) {
      return {
        status: 404,
        message: "No appointments exists with the id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched patient appointments.`,
      appointments: appointments,
    };
  }

  // This service DELETES appointment by id
  async deleteAppointmentById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any appointment exists with the _id
    const appointment = await this.AppointmentModel.findOneAndRemove({
      _id: _id,
    });

    if (!appointment) {
      return {
        status: 404,
        message: `No appointment with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Appointment with _id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES a appointment by id
  async updateAppointmentById(_id, updatedAppointment) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedAppointment]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any appointment exists with the _id
    const appointment = await this.AppointmentModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedAppointment }
    );

    if (!appointment) {
      return {
        status: 404,
        message: `No appointment with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Appointment with _id ${_id} has been updated successfully.`,
    };
  }
}
