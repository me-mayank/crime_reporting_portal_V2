import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";

//deleting user from the database
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User Deleted Successfully !!!",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error while deleting user!!",
    });
  }
};

//promoting user to admin
export const userToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: `user with ID: ${userId} doesn't exists in database`,
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: `User with ID: ${userId} is already an Admin`,
      });
    }

    //updating user role
    user.role = "admin";
    await user.save();

    res.status(200).json({
      message: `User with User-ID:${userId} has been promoted to ADMIN`,
      user: {
        id: user._id,
        name: user.name,
        gender: user.gender,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error while promoting",
    });
  }
};

//demoting from admin to user
export const adminToUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: `User with ID: ${userId} NOT FOUND`,
      });
    }

    if (user.role === "user") {
      return res.status(403).json({
        message: "this User is already demoted from admin",
        user: {
          name: user.name,
          gender: user.gender,
          email: user.email,
          role: user.role,
        },
      });
    }

    user.role = "user";
    await user.save();

    res.status(200).json({
      message: `User with ID:${userId} demoted from Admin`,
      user: {
        id: user._id,
        name: user.name,
        gender: user.gender,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR WHILE DEMOTING!!!!",
    });
  }
};

//get all user for admin to see
export const getAllUser = async (req, res) => {
  try {
    const { gender, role, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (gender) filter.gender = { $regex: gender, $options: "i" };
    if (role) filter.role = { $regex: role, $options: "i" };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const user = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      message: "User successfully Fetched",
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalUsers: total,
      users: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "INTERNAL SERVER ERROR!!",
    });
  }
};

// updating report status
export const reportStatusUpdate = async (req, res) => {
  try {
    const { reportId } = req.params; // extracting report id from the url
    let { status } = req.body; // asking for the updated status

    status = status.toLowerCase();

    if (!["open", "pending", "closed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid Status Value",
      });
    }

    //now finding the report in the database by reportId
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({
        message: "Report with this ID doesn't exist in the database!!",
      });
    }

    //now once we have got the report now updating its status
    const oldstatus = report.status;
    report.status = status; // updating the old status with new one
    await report.save(); // saving it to the database

    res.status(200).json({
      message: `Report status of report-ID: ${reportId} changed from ${oldstatus} to ${report.status}`,
      report,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while updating the report status",
    });
  }
};
