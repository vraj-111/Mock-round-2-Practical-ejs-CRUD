import express from "express";
import employeeController from "../controller/employee.controller.js";

const router = express.Router();

router.get("/", employeeController.getAllEmployee);

router.get("/add", employeeController.getAddEmployee);

router.post("/add", employeeController.add);

router.get("/edit/:id", employeeController.getEmployeeById);

router.post("/edit/:id", employeeController.updateEmployee);

router.get("/delete/:id", employeeController.deleteEmployeeById);

router.post(
  "/delete-multiple",
  employeeController.deleteMultipleEmployee
);

export default router;
