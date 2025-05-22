import EmployeeRepository from '../repositories/employee.repository'
import Employee, { EmployeeRole } from '../entities/employee.entity';
import Address from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import bcrypt from 'bcrypt'

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository){}

    async getAllEmployees(): Promise<Employee[]> {

        return this.employeeRepository.findMany();
    }

    async getEmployeeByID(id:number): Promise<Employee> {
        let employee= await this.employeeRepository.findOneById(id)
        if(!employee){
            throw new Error("Employee not found");
        }
        return employee;
    }

    async getEmployeeByEmail(email:string):Promise<Employee> {
        return this.employeeRepository.findByEmail(email)
    }

    async createEmployee(email:string, name:string, age:number, address:CreateAddressDto, password:string,role:EmployeeRole): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.email=email
        newEmployee.name=name
        newEmployee.age=age
        newEmployee.address=new Address()
        newEmployee.address.line1=address.line1,
        newEmployee.address.pincode=address.pincode
        newEmployee.password= await bcrypt.hash(password,10)
        newEmployee.role=role
        
        return this.employeeRepository.create(newEmployee)
    }

    async updateEmployee(id:number, email:string, name:string,age:number): Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneById(id)

        if(existingEmployee){
            const employee = new Employee();
            employee.name=name;
            employee.email=email;
            employee.age=age;
            await this.employeeRepository.update(id,employee)
        }
    }

    async deleteEmployee(id:number): Promise<void> {

        const existingEmployee = await this.employeeRepository.findOneById(id)
        if(existingEmployee){
            await this.employeeRepository.remove(existingEmployee)
        }
        
    }
}

export default EmployeeService