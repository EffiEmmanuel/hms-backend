const API_PREFIX = process.env.API_PREFIX;

const routes = {
  API_DOCTOR_ROUTE: `${API_PREFIX}/doctors`,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default routes;
