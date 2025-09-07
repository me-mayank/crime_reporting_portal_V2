import { Report } from "../models/report.model.js";
import cloudinary from "../utils/cloudinary.utils.js";

// cloudinary upload helper for cleaner code
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "crime_evidence",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(fileBuffer);
  });
};

export const createReport = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    let evidenceFiles = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadResult = await uploadToCloudinary(file.buffer);
        evidenceFiles.push({
          url: uploadResult.secure_url,
          type: uploadResult.resource_type,
          format: uploadResult.format,
        });
      }
    }

    // stiching all components of the report together
    const newReport = new Report({
      title,
      description,
      category,
      location,
      reporter: req.user.id,
      evidences: evidenceFiles,
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

//reports searching logic code
export const searchReports = async (req, res) => {
  try {
    // creating filter query
    const {
      title,
      description,
      category,
      status,
      city,
      state,
      district,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    //filter creation being ready
    let filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    if (category) filter.category = category.toLowerCase();
    if (status) filter.status = status.toLowerCase();
    if (city) filter["location.city"] = { $regex: city, $options: "i" };
    if (state) filter["location.state"] = { $regex: state, $options: "i" };
    if (district)
      filter["location.district"] = { $regex: district, $options: "i" };
    // the $regex is command for search in database and the $options: "i" if for case-insentivity
    if (startDate || endDate) {
      filter.dateReported = {};
      if (startDate) filter.dateReported.$gte = new Date(startDate);
      if (endDate) filter.dateReported.$lte = new Date(endDate);
    }

    //pagination logic
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    //actual search code
    const reports = await Report.find(filter)
      .populate("reporter", "name email")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Report.countDocuments(filter);

    res.status(200).json({
      message: "Reports searched successfully",
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalReports: total,
      reports,
    });
  } catch (error) {
    console.error("Error in searching reports: ", error);
    res.status(500).json({
      message: "Server Error while fetching reports !!!!",
    });
  }
};
