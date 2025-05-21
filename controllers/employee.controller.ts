import EmployeeService from "../services/employee.service";
import {Request, Response, Router} from "express";

class EmployeeController {
    constructor(private employeeService: EmployeeService, router:Router){
        router.post("/",this.createEmployee.bind(this));
        router.get("/:id",this.getEmployeeById.bind(this));
        router.get("/",this.getAllEmployees.bind(this));
        router.put("/:id",this.updateEmployee);
        router.delete("/:id",this.deleteEmployee);
    }

    async createEmployee(req:Request, res: Response){
        const email=req.body.email;
        const name=req.body.name;
        const savedEmployee = await this.employeeService.createEmployee(email, name);
        res.status(201).send(savedEmployee)
    }

    async getAllEmployees(req:Request, res:Response){
        const employees=await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    async getEmployeeById(req:Request, res:Response){
        const id=Number(req.params.id)
        const employee=await this.employeeService.getEmployeeByID(id)
        res.status(200).send(employee)
    }

    updateEmployee = async (req:Request, res:Response)=> {
        const id=Number(req.params.id)
        const email= req.body.email
        const name=req.body.name

        await this.employeeService.updateEmployee(id,email,name)
        res.status(204).send();
    }

    deleteEmployee = async (req:Request, res:Response)=> {
        const id=Number(req.params.id)

        await this.employeeService.deleteEmployee(id)
        res.status(200).send();
    }

}

export default EmployeeController;