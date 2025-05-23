import {Router} from 'express'
import DepartmentService from '../services/department.service'
import HttpException from '../exception/httpException'
import {Request, Response, NextFunction} from 'express'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { validate } from "class-validator";
import { plainToInstance, } from "class-transformer";
import { UpdateDepartmentDto } from '../dto/update-department.dto'

class DepartmentController{

    constructor(private departmentService: DepartmentService,
        private router: Router
    ){
        router.post("/",this.register.bind(this))
        router.put("/:id",this.updateDepartment.bind(this))
        router.delete("/:id",this.removeDepartment.bind(this))
    }

    async register(req: Request, res: Response, next: NextFunction){

        try{

            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }

            const newDepartment = await this.departmentService.createDepartment(createDepartmentDto)

            res.status(200).send({"message":"department registered","new department":newDepartment})
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
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }

            await this.departmentService.updateDepartment(id,updateDepartmentDto)

            res.status(200).send({"message":"department updated"})

        }catch(err){
            next(err)
        }
    }

    async removeDepartment(req:Request, res: Response, next:NextFunction){
        try{
            const id=Number(req.params.id)

            await this.departmentService.deleteDepartment(id)

            res.status(201).send({"message":"department removed"})

        }catch(err){
            next(err)
        }
    }
    
}

export default DepartmentController