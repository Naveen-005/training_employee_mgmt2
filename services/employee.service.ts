import EmployeeRepository from '../repositories/employee.repository'
import Employee, { EmployeeRole } from '../entities/employee.entity';
import Address from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import bcrypt from 'bcrypt'
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import DepartmentRepository from '../repositories/department.repository';

class EmployeeService {

    constructor(private employeeRepository: EmployeeRepository,
        private departmentRepository: DepartmentRepository
    ){}

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

    async createEmployee(employee: CreateEmployeeDto, address:CreateAddressDto): Promise<Employee> {

        const newEmployee = new Employee();
        newEmployee.email=employee.email
        newEmployee.name=employee.name
        newEmployee.age=employee.age
        newEmployee.employeeId=employee.employeeId
        newEmployee.dateOfJoining=employee.dateOfJoining
        newEmployee.address=new Address()
        newEmployee.address.line1=address.line1,
        newEmployee.address.line2=address.line2,
        newEmployee.address.houseNo=address.houseNo,
        newEmployee.address.pincode=address.pincode
        newEmployee.password= await bcrypt.hash(employee.password,10)
        newEmployee.role=employee.role
        newEmployee.status=employee.status
        newEmployee.experience=employee.experience
        newEmployee.department= await this.departmentRepository.findOneById(employee.department_id)
        
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