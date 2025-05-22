import express from "express";
import DepartmentRepository from "../repositories/department.repository";
import dataSource from "../db/data-source";
import Department from "../entities/department.entity";
import DepartmentService from "../services/department.service";
import DepartmentController from "../controllers/department.controller";

const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))
const departmentService = new DepartmentService(departmentRepository)
const departmentController = new DepartmentController(departmentService,departmentRouter)

export { departmentRouter}