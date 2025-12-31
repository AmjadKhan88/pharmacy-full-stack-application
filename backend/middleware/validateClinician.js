// backend/middlewares/validateClinician.js
export const validateClinician = (req, res, next) => {
  const { firstname, lastname, email, specialty, licensenumber, phone } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !specialty ||
    !licensenumber ||
    !phone
  ) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  next();
};
