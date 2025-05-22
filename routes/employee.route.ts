import EmployeeController from "../controllers/employee.controller";
import express from "express";
import EmployeeRepository from "../repositories/employee.repository";
import dataSource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";

const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee))
const employeeService = new EmployeeService(employeeRepository)
const employeeController = new EmployeeController(employeeService, employeeRouter)

export {employeeService}
export default employeeRouter;