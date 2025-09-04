import { Report } from "../models/report.model.js";

export const createReport = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    const newReport = new Report({
      title,
      description,
      category,
      location,
      reporter: req.user.id,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report filled successfully",
      report: newReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in creating report",
    });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("reporter", "name email");
    res.status(200).json({
      message: "All reports fetched successfully",
      reports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error while fetching reports !!!",
    });
  }
};
