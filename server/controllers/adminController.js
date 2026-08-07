const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Debug logs
    console.log("========== ADMIN LOGIN ==========");
    console.log("Entered Email:", email);
    console.log("ENV Email:", adminEmail);
    console.log("Entered Password:", password);
    console.log("Password Hash:", adminPassword);

    if (email !== adminEmail) {
      console.log("❌ Email does not match");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      adminPassword
    );

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(adminEmail);

    console.log("✅ Login Successful");

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });

  } catch (error) {
    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
};