import jsonwebtoken from "jsonwebtoken";
import routes from "../routes.js";
import DoctorModel from "../models/doctor.model.js";

const { sign, verify } = jsonwebtoken;

// This method validates input fields
export function validateFields(args) {
  args.forEach((arg) => {
    if (!arg || arg === "") {
      return {
        status: 404,
        message: "Please fill in the missing fields",
      };
    }
  });
}

// This method checks if a doctor email is valid - if it exists in the DB or not
export async function checkDoctorEmailValidity(email) {
  const doctorExists = await DoctorModel.findOne({ email });
  console.log("EMAIL:", email);
  if (doctorExists)
    return {
      message: "An account is already associated with the email provided.",
      status: 409,
      doctor: doctorExists,
    };

  return {
    message: "Available",
    status: 200,
  };
}

export const jwtSign = (payload) => {
  return sign(payload, `${routes.JWT_SECRET}`, { expiresIn: "23h" });
};

export const jwtVerify = (token) => {
  try {
    return verify(token, `${routes.JWT_SECRET}`);
  } catch (error) {
    return false;
  }
};

export const verifyUserToken = (request, response, next) => {
  try {
    const authHeader = request.headers.token;
    let result;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      result = jwtVerify(token);
      if (!result) {
        response.status(400).send("Invalid bearer token");
      } else {
        request.decoded = result;
        next();
      }
    } else {
      response.status(500).send("Token is required!");
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: error,
    });
  }
};

// This  service validates the doctor log in OTP
export async function validateLoginOTP(otp) {}

// This  service validates the doctor OTP
export async function validateOTP(otp) {}
