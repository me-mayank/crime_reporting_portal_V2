import { Report } from "../models/report.model";

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
