import express from "express";
import DepartmentRepository from "../repositories/department.repository";
import dataSource from "../db/data-source";
import Department from "../entities/department.entity";

const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))