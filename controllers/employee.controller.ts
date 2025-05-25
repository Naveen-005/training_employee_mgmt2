import HttpException from "../exception/httpException";
import EmployeeService from "../services/employee.service";
import {Request, Response, Router, NextFunction} from "express";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { plainToInstance, } from "class-transformer";
import { validate } from "class-validator";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { checkRole } from "../middlewares/authorizationMiddleware";
import { EmployeeRole } from "../entities/employee.entity";
import { LoggerService } from "../services/logger.service";

const logger = LoggerService.getInstance('EmployeeController');

class EmployeeController {
    constructor(private employeeService: EmployeeService, router:Router){
        router.post("/",checkRole([EmployeeRole.HR,EmployeeRole.DEVELOPER]),this.createEmployee.bind(this));
        router.get("/:id",this.getEmployeeById.bind(this));
        router.get("/",this.getAllEmployees.bind(this));
        router.put("/:id",checkRole([EmployeeRole.HR]),this.updateEmployee);
        router.delete("/:id",checkRole([EmployeeRole.HR]),this.deleteEmployee);
    }

    async createEmployee(req:Request, res: Response, next:NextFunction){

        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                throw new HttpException(400,"Invalid Details");
            }
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto,
                createEmployeeDto.address
            );
            
            logger.info(`New employee created ${savedEmployee.id} ${savedEmployee.name} `)

            res.status(201).send(savedEmployee);
        } catch (error) {
            next(error);
        }
        
    }

    async getAllEmployees(req:Request, res:Response){
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeById(req:Request, res:Response, next: NextFunction){

        try{
            const id=Number(req.params.id)
            const employee=await this.employeeService.getEmployeeByID(id)
            if (!employee){
                throw new HttpException(404,'employee not found')
            }
            res.status(200).send(employee)
        } catch(err){
            console.log(err)
            next(err);
        }
            
    }

    updateEmployee = async (req:Request, res:Response, next:NextFunction)=> {

        try{
            const id=Number(req.params.id)
            // const email= req.body.email
            // const name=req.body.name

            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(updateEmployeeDto,{skipMissingProperties:true});

            if (errors.length > 0) {
                throw new HttpException(400,"Invalid format");
            }


            await this.employeeService.updateEmployee(id,updateEmployeeDto)
            logger.info(`Updated employee of id ${id}`)
            res.status(200).send();

        }catch (error) {
            next(error);
        }
        
    }

    deleteEmployee = async (req:Request, res:Response)=> {
        const id=Number(req.params.id)

        await this.employeeService.deleteEmployee(id)
        logger.info(`Deleted employee of id ${id}`)
        res.status(204).send();
    }



}

export default EmployeeController;