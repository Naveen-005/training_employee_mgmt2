import {Router} from 'express'
import DepartmentService from '../services/department.service'
import HttpException from '../exception/httpException'
import {Request, Response, NextFunction} from 'express'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { validate } from "class-validator";
import { plainToInstance, } from "class-transformer";

class DepartmentController{

    constructor(private departmentService: DepartmentService,
        private router: Router
    ){
        router.post("/",this.register.bind(this))
    }

    async register(req: Request, res: Response, next: NextFunction){

        try{
            console.log("name=",req.body.name)
            console.log("body=",req.body)
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
    
}

export default DepartmentController