import EmployeeController from "../controllers/employee.controller";
import express from "express";
import EmployeeRepository from "../repositories/employee.repository";
import dataSource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import DepartmentRepository from "../repositories/department.repository";
import Department from "../entities/department.entity";

const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee))
const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))
const employeeService = new EmployeeService(employeeRepository,departmentRepository)
const employeeController = new EmployeeController(employeeService, employeeRouter)

export {employeeService}
export default employeeRouter;