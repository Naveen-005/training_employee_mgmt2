import { JwtPayload } from "../dto/jwt-payload";
import HttpException from "../exception/httpException";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import EmployeeService from "./employee.service";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export class AuthService {
    constructor(private empployeeService: EmployeeService) {}

    async login(email:string, password:string){
        const employee=await this.empployeeService.getEmployeeByEmail(email)
        if(!employee){
            throw new HttpException(404,"No such user found")
        }
        const isPasswordValid= await bcrypt.compare(password,employee.password)
        console.log("password="+password+" valid="+isPasswordValid)
        if(!isPasswordValid){
            console.log("Throwing error")
            throw new HttpException(400,"Invalid user")
        }
        const payload:JwtPayload={
            id:employee.id,
            email:employee.email
        }
        const token = jwt.sign(payload,JWT_SECRET,{expiresIn: JWT_VALIDITY});
        return{
            tokenType:"Bearer",
            accessToken:token
        }
    }

}