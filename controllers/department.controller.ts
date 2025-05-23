import {Router} from 'express'
import DepartmentService from '../services/department.service'
import HttpException from '../exception/httpException'
import {Request, Response, NextFunction} from 'express'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { validate } from "class-validator";
import { plainToInstance, } from "class-transformer";
import { UpdateDepartmentDto } from '../dto/update-department.dto'
import { checkRole } from '../middlewares/authorizationMiddleware'
import { EmployeeRole } from '../entities/employee.entity'
import { LoggerService } from "../services/logger.service";

const logger = LoggerService.getInstance('DepartmentController');

class DepartmentController{

    constructor(private departmentService: DepartmentService,
        private router: Router
    ){
        router.post("/",checkRole([EmployeeRole.HR]),this.register.bind(this))
        router.get("/",this.getAllDepartments.bind(this))
        router.get("/:id",this.getDepartmentById.bind(this))
        router.put("/:id",checkRole([EmployeeRole.HR]),this.updateDepartment.bind(this))
        router.delete("/:id",checkRole([EmployeeRole.HR]),this.removeDepartment.bind(this))
    }

    async register(req: Request, res: Response, next: NextFunction){

        try{

            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                //console.log(JSON.stringify(errors));
                throw new HttpException(400, "Invalid format");
            }

            const newDepartment = await this.departmentService.createDepartment(createDepartmentDto)
            logger.info(`New department created ${newDepartment.id} ${newDepartment.name}`)
            res.status(201).send({"message":"department registered","new department":newDepartment})
        } catch(err){
            next(err)
        }

    }

    async updateDepartment(req: Request, res: Response, next: NextFunction){
        try{

            const id=Number(req.params.id)
            const updateDepartmentDto = plainToInstance(UpdateDepartmentDto, req.body);
            
            const errors = await validate(updateDepartmentDto);
            if (errors.length > 0) {
                //console.log(JSON.stringify(errors));
                throw new HttpException(400, "Invalid format");
            }

            await this.departmentService.updateDepartment(id,updateDepartmentDto)
            logger.info(`Updated details of department with id ${id}`)
            res.status(200).send({"message":"department updated"})

        }catch(err){
            next(err)
        }
    }

    async removeDepartment(req:Request, res: Response, next:NextFunction){
        try{
            const id=Number(req.params.id)

            await this.departmentService.deleteDepartment(id)
            logger.info(`Deeted department with id ${id}`)
            res.status(204).send({"message":"department removed"})

        }catch(err){
            next(err)
        }
    }

    async getAllDepartments(req:Request, res:Response, next:Function){
        const departments= await this.departmentService.getAllDepartments()
        
        res.status(200).send(departments)
    }

    async getDepartmentById(req:Request, res:Response, next:Function){

        try{

            const id=Number(req.params.id)
            const department= await this.departmentService.getDepartmentByID(id)
            res.status(200).send(department)

        } catch(err){
            next(err)
        }
    }
    
}

export default DepartmentController