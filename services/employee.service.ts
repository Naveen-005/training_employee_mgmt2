import EmployeeRepository from '../repositories/employee.repository'
import Employee from '../entities/employee.entity';
import Address from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository){}

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeByID(id:number): Promise<Employee> {
        return this.employeeRepository.findOneById(id)
    }

    async createEmployee(email:string, name:string, age:number, address:CreateAddressDto): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.email=email
        newEmployee.name=name
        newEmployee.age=age
        newEmployee.address=new Address()
        newEmployee.address.line1=address.line1,
        newEmployee.address.pincode=address.pincode
        
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