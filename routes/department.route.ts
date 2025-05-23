import express from "express";
import DepartmentRepository from "../repositories/department.repository";
import dataSource from "../db/data-source";
import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import DepartmentService from "../services/department.service";
import DepartmentController from "../controllers/department.controller";
import EmployeeRepository from "../repositories/employee.repository";

const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))
const employeeRepository= new EmployeeRepository(dataSource.getRepository(Employee))
const departmentService = new DepartmentService(departmentRepository,employeeRepository)
const departmentController = new DepartmentController(departmentService,departmentRouter)

export { departmentRouter}