const cloudinary = require("../config/cloudinary");

const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;

    console.log("Public ID Received:", publicId);

    const resource = await cloudinary.api.resource(publicId);

    console.log("Resource Found:", resource);

    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Delete Result:", result);

    res.json({
      success: true,
      resource,
      result,
    });

  } catch (error) {
    console.error("Cloudinary Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { deleteImage };