import bcrypt from "bcryptjs";
import { validateFields, jwtSign } from "../util/auth.helper.js";

export default class VisitService {
  constructor(InternistikaVisitModel) {
    this.VisitModel = InternistikaVisitModel;
  }

  // This service CREATES a new visit - Sign up service
  async createVisit(
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
  ) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
      doctorId,
      patientId,
      rentgen,
      ct,
      echo,
      analysis,
      type,
      drugs,
      injections,
      diagnosis,
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // If the email is available, then proceed to sign up the visit
    const newVisit = await this.VisitModel.create({
      doctor: doctorId,
      patient: patientId,
      rentgen,
      ct,
      echo,
      analysis,
      type,
      drugs,
      injections,
      diagnosis,
    });

    return {
      status: 201,
      message: "Visit was created successfully!",
      visit: newVisit,
    };
  }

  // This service GETS PATIENT visitS
  async getPatientVisits(patientId) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([patientId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any visit exists
    const visits = await this.VisitModel.find({
      patient: patientId,
    });

    if (!visits) {
      return {
        status: 404,
        message: "No visits exists with the email specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched patients visits.`,
      visits: visits,
    };
  }

  // This service GETS visitS
  async getVisits(doctorId, page, limit) {
    const skip = (page - 1) * limit;

    // Validate if fields are empty
    const areFieldsEmpty = validateFields([doctorId]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any visit exists
    const visits = await this.VisitModel.find({
      doctor: doctorId,
    })
      .skip(skip)
      .limit(limit)
      .populate("doctor")
      .populate("patient");

    if (!visits) {
      return {
        status: 404,
        message: "No visits exists with the doctor id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched visits.`,
      visits: visits,
    };
  }

  // This service GETS a visit by their id
  async getVisitById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any visit exists with the _id
    const visit = await this.VisitModel.findOne({
      _id: _id,
    });

    if (!visit) {
      return {
        status: 404,
        message: "No visit exists with the id specified.",
      };
    }

    return {
      status: 200,
      message: `Fetched visit with id ${_id}.`,
      visit: visit,
    };
  }

  // This service DELETES visit by id
  async deleteVisitById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any visit exists with the _id
    const visit = await this.VisitModel.findOneAndRemove({ _id: _id });

    if (!visit) {
      return {
        status: 404,
        message: `No visit with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Visit with _id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES a visit by id
  async updateVisitById(_id, updatedVisit) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedVisit]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any visit exists with the _id
    const visit = await this.VisitModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedVisit }
    );

    if (!visit) {
      return {
        status: 404,
        message: `No visit with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Visit with _id ${_id} has been updated successfully.`,
    };
  }
}
