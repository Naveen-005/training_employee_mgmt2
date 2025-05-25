import express from "express";
import { AuthService } from '../services/auth.service';
import dataSource from "../db/data-source";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import { employeeService } from "./employee.route";
import AuthController from "../controllers/auth.controller"

const authRouter= express.Router();

// const repository= dataSource.getRepository(Employee);
// const employeeRepository= new EmployeeRepository(repository);
// const employeeService=  new EmployeeService(employeeRepository)
const authService = new AuthService(employeeService);
const authController= new AuthController(authService,authRouter)

export {authRouter}