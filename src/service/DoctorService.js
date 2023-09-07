import bcrypt from "bcryptjs";
import {
  checkDoctorEmailValidity,
  validateFields,
  jwtSign,
} from "../util/auth.helper.js";

export default class DoctorService {
  constructor(InternistikaDoctorModel) {
    this.DoctorModel = InternistikaDoctorModel;
  }

  // This service CREATES a new doctor - Sign up service
  async signupDoctor(doctor) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([
      doctor.firstName,
      doctor.lastName,
      doctor.email,
      doctor.password,
    ]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if doctor is already signed up
    const doctorAlreadyExistsWithEmail = await checkDoctorEmailValidity(
      doctor.email
    );

    // If doctor email already exists
    if (doctorAlreadyExistsWithEmail.status === 409)
      return doctorAlreadyExistsWithEmail;

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(doctor.password, salt);

    // If the email is available, then proceed to sign up the doctor
    const newDoctor = await this.DoctorModel.create({
      ...doctor,
      password: hashedPassword,
    });

    return {
      status: 201,
      message: "Your account has been created successfully!",
      doctor: newDoctor,
    };
  }

  // This service logs in the doctor
  async loginDoctor(email, password) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([email, password]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // If the fields are not empty, check the DB for hwid
    const doctorExists = await checkDoctorEmailValidity(email);

    console.log("doctor exists:", doctorExists);

    if (doctorExists.status == 200) {
      // i.e If a doctor with the provided email DOES NOT exist. Check checkEmailValidity() for more context
      return {
        status: 404,
        message: "The email provided is not associated with any accounts.",
      };
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      `${doctorExists?.doctor?.password}`
    );

    if (!isPasswordCorrect) {
      return {
        status: 403,
        message: "Invalid email or password provided.",
      };
    }

    const token = jwtSign(doctorExists);
    console.log(token);

    return {
      token: token,
      doctor: doctorExists?.doctor,
      status: 200,
      message: "Log in successful!",
    };
  }

  // This service GETS a doctor by their email
  async getDoctorByEmail(email) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([email]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any doctor exists with the email
    const doctor = await this.DoctorModel.findOne({
      email: email,
    });

    if (!doctor) {
      return {
        status: 404,
        message: "No doctor exists with the email specified.",
        doctor: doctor,
      };
    }

    return {
      status: 200,
      message: `Fetched doctor with email ${email}.`,
      doctor: doctor,
    };
  }

  // This service GETS a doctor by their id
  async getDoctorById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any doctor exists with the doctorname
    const doctor = await this.DoctorModel.findOne({
      _id: _id,
    });

    if (!doctor) {
      return {
        status: 404,
        message: "No doctor exists with the id specified.",
        doctor: doctor,
      };
    }

    return {
      status: 200,
      message: `Fetched doctor with id ${_id}.`,
      doctor: doctor,
    };
  }

  // This service DELETES doctor by id
  async deleteDoctorById(_id) {
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any doctor exists with the _id
    const doctor = await this.DoctorModel.findOneAndRemove({ _id: _id });

    if (!doctor) {
      return {
        status: 404,
        message: `No doctor with _id ${_id} exists.`,
      };
    }

    return {
      status: 201,
      message: `Doctor with _id ${_id} has been deleted successfully.`,
    };
  }

  // This service UPDATES a doctor by id
  async updateDoctorById(_id, updatedDoctor) {
    console.log("HI:", updatedDoctor);
    // Validate if fields are empty
    const areFieldsEmpty = validateFields([_id, updatedDoctor]);

    // areFieldsEmpty is an object that contains a status and message field
    if (areFieldsEmpty) return areFieldsEmpty;

    // Check if any doctor exists with the _id
    const doctor = await this.DoctorModel.findOneAndUpdate(
      { _id: _id },
      { ...updatedDoctor }
    );

    if (!doctor) {
      return {
        status: 404,
        message: `No doctor with _id ${_id} exists.`,
      };
    }

    const myDoctor = await this.DoctorModel.findOne({ _id: _id });

    return {
      status: 201,
      message: `Doctor with _id ${_id} has been updated successfully.`,
      doctor: myDoctor,
    };
  }
}
