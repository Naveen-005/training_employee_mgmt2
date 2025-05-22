import HttpException from "../exception/httpException";
import EmployeeService from "../services/employee.service";
import {Request, Response, Router, NextFunction} from "express";
import { isEmail } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { CreateAddressDto } from "../dto/create-address.dto";
import { plainToInstance, } from "class-transformer";
import { validate } from "class-validator";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

class EmployeeController {
    constructor(private employeeService: EmployeeService, router:Router){
        router.post("/",this.createEmployee.bind(this));
        router.get("/:id",this.getEmployeeById.bind(this));
        router.get("/",this.getAllEmployees.bind(this));
        router.put("/:id",this.updateEmployee);
        router.delete("/:id",this.deleteEmployee);
    }

    async createEmployee(req:Request, res: Response, next:NextFunction){

        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto.email,
                createEmployeeDto.name,
                createEmployeeDto.age,
                createEmployeeDto.address,
                createEmployeeDto.password
            );
            res.status(201).send(savedEmployee);
        } catch (error) {
            next(error);
        }
        
    }

    async getAllEmployees(req:Request, res:Response){
        const employees=await this.employeeService.getAllEmployees();
        console.log("req.user="+req.user)
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
            const email= req.body.email
            const name=req.body.name

            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(updateEmployeeDto,{skipMissingProperties:true});

            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }



            await this.employeeService.updateEmployee(id,updateEmployeeDto.email,updateEmployeeDto.name,updateEmployeeDto.age)
            res.status(204).send();

        }catch (error) {
            next(error);
        }
        
    }

    deleteEmployee = async (req:Request, res:Response)=> {
        const id=Number(req.params.id)

        await this.employeeService.deleteEmployee(id)
        res.status(200).send();
    }



}

export default EmployeeController;