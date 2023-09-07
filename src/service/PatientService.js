import bcrypt from "bcryptjs";
import { validateFields, jwtSign } from "../util/auth.helper.js";

export default class PatientService {
  constructor(InternistikaPatientModel) {
    this.PatientModel = InternistikaPatientModel;
  }

  // This service CREATES a new patient
  async createPatient(
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
  ) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
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
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // If the email is available, then proceed to sign up the patient
    const newPatient = await this.PatientModel.create({
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
    });

    return {
      status: 201,
      message: "Patient was created successfully!",
      patient: newPatient,
    };
  }

  // This service GETS a patient by Id
  async getPatient(patientId) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([patientId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any patient exists
    const patient = await this.PatientModel.find({
      _id: patientId,
    });

    if (!patient) {
      return {
        status: 404,
        message: "No patient exists with the email specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched patients patients.`,
      patient: patient,
    };
  }

  // This service GETS patientS
  async getPatients(page, limit) {
    console.log("PAGE:", page);
    const skip = (page - 1) * limit;
    console.log("SKIP:", skip);
    // Check if any patient exists
    const patients = await this.PatientModel.find().skip(skip).limit(limit);

    if (!patients) {
      return {
        status: 404,
        message: "No patients exists.",
      };
    }

    return {
      status: 200,
      message: `Fetched patients.`,
      patients: patients,
    };
  }

  // This service GETS a patient's visits
  async getPatientVisits(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any patient exists with the _id
    const patient = await this.PatientModel.findOne({
      _id: _id,
    }).populate("visits");

    if (!patient) {
      return {
        status: 404,
        message: "No patient exists with the id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched patient with id ${_id}.`,
      visits: patient?.visits,
    };
  }

  // This service DELETES patient by id
  async deletePatientById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any patient exists with the _id
    const patient = await this.PatientModel.findOneAndRemove({ _id: _id });

    if (!patient) {
      return {
        status: 404,
        message: `No patient with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Patient with _id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES a patient by id
  async updatePatientById(_id, updatedPatient) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedPatient]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any patient exists with the _id
    const patient = await this.PatientModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedPatient }
    );

    if (!patient) {
      return {
        status: 404,
        message: `No patient with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Patient with _id ${_id} has been updated successfully.`,
    };
  }
}
