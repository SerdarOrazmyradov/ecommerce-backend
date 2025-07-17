import { db } from "../config/db.js";
import { addToFavorites } from "../services/jobSeekerService.js";
import {
  createJob,
  deleteJob,
  getApplyedUsers,
  getEmployerJobs,
} from "../services/jobService.js";

export const create = async (req, res) => {
  const {
    title,
    description,
    company,
    location,
    category,
    salary_range,
    employment_type,
    is_active,
  } = req.body;
  const employer_id = req.user.user_id;
  const role = req.user.role;
  if (role !== "employer") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only employers can create jobs.",
    });
  }
  const result = await createJob(
    title,
    description,
    company,
    location,
    category,
    salary_range,
    employment_type,
    is_active,
    employer_id
  );

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

export const employerJobs = async (req, res) => {
  const employer_id = req.user.user_id;
  const page = req.query.page||1;
  const title = req.query.title;
  const description = req.query.description;
  const active = req.query.active;
  const company = req.query.company;
  const location = req.query.location;
  const category = req.query.category;
  const salary_range = req.query.salary_range;
  const employment_type = req.query.employment_type;

  const result = await getEmployerJobs(
    employer_id,
    page,
    title,
    description,
    active,
    company,
    location,
    category,
    salary_range,
    employment_type
  );

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

export const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const {
    title,
    description,
    company,
    location,
    category,
    salary_range,
    employment_type,
    is_active,
  } = req.body;

  try {
    // Ilki bilen iş barlanyp, onuň is_active ýagdaýy alynýar
    const checkJob = await db.query(
      `SELECT * FROM jobs WHERE id = $1`,
      [jobId]
    );

    if (checkJob.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    const existingJob = checkJob.rows[0];

    if (!existingJob.is_active) {
      return res.status(403).json({
        success: false,
        message: "Pozlan işe (is_active = false) täzeden üýtgetme girizip bolmaýar.",
      });
    }

    // Üýtgetmeler girizilýär
    const result = await db.query(
      `UPDATE jobs
       SET title = $1,
           description = $2,
           company = $3,
           location = $4,
           category = $5,
           salary_range = $6,
           employment_type = $7,
           is_active = $8
       WHERE id = $9
       RETURNING *`,
      [
        title,
        description,
        company,
        location,
        category,
        salary_range,
        employment_type,
        is_active,
        jobId,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job: result.rows[0],
    });

  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the job.",
    });
  }
};


export const deleteEmployerJob = async (req, res) => {
  const jobId = req.params.id;
  const employerId = req.user.user_id;

  try {
    const result = await deleteJob(jobId, employerId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const applyedUsers = async (req, res) => {
  const jobId = req.params.id;
  const employerId = req.user.user_id;
  const page = req.query.page || 1;

  try {
    const result = await getApplyedUsers(jobId, employerId, page);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error getting applyed jobs:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
