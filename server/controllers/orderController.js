const sendEmail = require("../utils/sendEmail");
const Counter = require("../models/Counter");
const Order = require("../models/Order");

// ===============================
// CREATE ORDER
// ===============================
const createOrder = async (req, res) => {
  try {
    // Generate next order number
    const counter = await Counter.findOneAndUpdate(
      { name: "order" },
      { $inc: { sequence: 1 } },
      {
        upsert: true,
        returnDocument: "after",
      }
    );

    const year = new Date().getFullYear();

    const orderId = `SKA-${year}-${String(counter.sequence).padStart(
      5,
      "0"
    )}`;

   
const order = await Order.create({
  ...req.body,
  orderId,
  user: req.user.userId,
});

    // Send confirmation email
    await sendEmail({
      to: order.email,
      subject: "🎨 Order Confirmation - Sundhar Karthick Art Gallery",

      html: `
      <div style="max-width:650px;margin:auto;background:#1f2937;
      color:white;font-family:Arial;padding:40px;border-radius:12px;">

      <h1 style="color:#f59e0b;text-align:center;">
      🎨 Sundhar Karthick Art Gallery
      </h1>

      <hr style="border-color:#374151">

      <h2>Hello ${order.customerName},</h2>

      <p>
      Thank you for placing your portrait order.
      We have received your order successfully.
      </p>

      <table style="width:100%;margin-top:25px;border-collapse:collapse;">

      <tr>
      <td><strong>Order ID</strong></td>
      <td>${order.orderId}</td>
      </tr>

      <tr>
      <td><strong>Artwork</strong></td>
      <td>${order.artworkType}</td>
      </tr>

      <tr>
      <td><strong>Paper Size</strong></td>
      <td>${order.paperSize}</td>
      </tr>

      <tr>
      <td><strong>Estimated Price</strong></td>
      <td>₹${order.estimatedPrice}</td>
      </tr>

      <tr>
      <td><strong>Advance Paid</strong></td>
      <td>₹${order.advanceAmount}</td>
      </tr>

      </table>

      <div style="margin-top:35px;text-align:center;">

      <a href="${process.env.CLIENT_URL}/my-orders"
  style="
  background:#f59e0b;
  color:white;
  padding:14px 28px;
  text-decoration:none;
  border-radius:8px;
  font-weight:bold;
  ">
  View My Orders
</a>

      </div>

      <p style="margin-top:40px;color:#d1d5db;">
      Thank you for choosing
      <strong>Sundhar Karthick Art Gallery</strong>.
      </p>

      </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL ORDERS
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const totalOrders =
      await Order.countDocuments();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      orders,
      totalOrders,
      totalPages: Math.ceil(
        totalOrders / limit
      ),
      currentPage: page,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// GET MY ORDERS
// ===============================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE ORDER STATUS
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
      },
      {
        returnDocument: "after",
      }
    );

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// TRACK ORDER BY EMAIL
// ===============================
const trackOrder = async (req, res) => {
  try {
    const { orderId, email } = req.body;

    const order = await Order.findOne({
      orderId,
      email: email.toLowerCase(),
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// TRACK ORDER BY ORDER ID
// ===============================
const trackOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      orderId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// UPLOAD COMPLETED PORTRAIT
// ===============================
const uploadCompletedPortrait = async (req, res) => {
  try {
    const { id } = req.params;
    const { completedImageUrl } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        completedImageUrl,
        completedAt: new Date(),
        orderStatus: "Completed",
      },
      {
        returnDocument: "after",
      }
    );

    // Send completion email
    await sendEmail({
      to: order.email,
      subject: "🎉 Your Portrait is Ready! - Sundhar Karthick Art Gallery",

      html: `
      <div style="max-width:650px;margin:auto;background:#1f2937;
      color:white;font-family:Arial;padding:40px;border-radius:12px;">

      <h1 style="color:#f59e0b;text-align:center;">
      🎨 Sundhar Karthick Art Gallery
      </h1>

      <hr style="border-color:#374151">

      <h2>Hello ${order.customerName},</h2>

      <p>
      Great news! 🎉
      </p>

      <p>
      Your portrait has been completed successfully.
      </p>

      <table style="width:100%;margin-top:25px;border-collapse:collapse;">

      <tr>
      <td><strong>Order ID</strong></td>
      <td>${order.orderId}</td>
      </tr>

      <tr>
      <td><strong>Artwork</strong></td>
      <td>${order.artworkType}</td>
      </tr>

      <tr>
      <td><strong>Status</strong></td>
      <td style="color:#22c55e;"><strong>Completed</strong></td>
      </tr>

      </table>

      <div style="margin-top:35px;text-align:center;">

      <a
      href="${process.env.CLIENT_URL}/my-orders"
      style="
      background:#22c55e;
      color:white;
      padding:14px 28px;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
      ">
      View & Download Portrait
      </a>

      </div>

      <p style="margin-top:40px;color:#d1d5db;">
      Thank you for choosing
      <strong>Sundhar Karthick Art Gallery</strong>.
      We hope you love your artwork! ❤️
      </p>

      </div>
      `,
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE ORDER
// ===============================
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// EXPORTS
// ===============================
module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  trackOrder,
  trackOrderById,
  uploadCompletedPortrait,
  deleteOrder,
  getMyOrders,
};