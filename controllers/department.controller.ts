import {Router} from 'express'
import DepartmentService from '../services/department.service'
import HttpException from '../exception/httpException'
import {Request, Response, NextFunction} from 'express'

class DepartmentController{
    constructor(private departmentService: DepartmentService,
        private router: Router
    ){
        router.post("/",this.register.bind(this))
    }

    async register(req: Request, res: Response, next: NextFunction){

        const {name, employees} = req.body

        res.status(200).send({"message":"department registered"})

    }
    
}

export default DepartmentController