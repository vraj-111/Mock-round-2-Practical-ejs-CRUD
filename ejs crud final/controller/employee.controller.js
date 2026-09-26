import mongoose from "mongoose";
import HttpError from "../middleware/httpError.js";
import Employee from "../models/employee.model.js";

const getAddEmployee = async (req, res, next) => {
  try {
    res.render("employees/add");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const add = async (req, res, next) => {
  try {
    const { name, email, phone, image } = req.body;

    const employee = new Employee({
      name,
      email,
      phone,
      image,
      status: true,
    });

    await employee.save();

    res.redirect("/");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find({
      status: true,
    }).sort({
      created_date: -1,
    });

    res.render("employees/index", {
      employees,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new HttpError("Invalid employee ID", 400));
    }

    const employee = await Employee.findOne({
      _id: id,
      status: true,
    });

    if (!employee) {
      return next(new HttpError("Employee not found", 404));
    }

    res.render("employees/edit", {
      employee,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new HttpError("Invalid employee ID", 400));
    }

    const employee = await Employee.findOneAndUpdate(
      {
        _id: id,
        status: true,
      },
      {
        name,
        email,
        phone,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!employee) {
      return next(new HttpError("Employee not found", 404));
    }

    res.redirect("/");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new HttpError("Invalid employee ID", 400));
    }

    const employee = Employee.findOneAndUpdate(
      {
        _id: id,
        status: true,
      },
      {
        new: true,
      },
    );

    if (!employee) {
      return next(new HttpError("Employee not found", 404));
    }

    res.redirect("/");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteMultipleEmployee = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(new HttpError("No employees selected", 400));
    }

    await Employee.updateMany(
      {
        _id: {
          $in: ids,
        },
        status: true,
      },
      {
        status: false,
        updated_date: new Date(),
      },
    );

    res.redirect("/");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  getAddEmployee,
  add,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeById,
  deleteMultipleEmployee,
};
