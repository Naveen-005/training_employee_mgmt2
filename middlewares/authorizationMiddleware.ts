import{Request, Response, NextFunction} from 'express'
import { EmployeeRole } from '../entities/employee.entity'
import HttpException from '../exception/httpException'


export const authorizationMiddleware=(req:Request, res:Response, next:NextFunction)=>{
    
    const user=req.user
    if(user.role!==EmployeeRole.HR){
        throw new HttpException(403,"User has no access to this resource")
    }
    
    next()
}
