import EmployeeRepository from '../repositories/employee.repository'
import Employee from '../entities/employee.entity';

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository){}

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeByID(id:number): Promise<Employee> {
        return this.employeeRepository.findOneById(id)
    }

    async createEmployee(email:string, name:string): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.email=email
        newEmployee.name=name
        return this.employeeRepository.create(newEmployee)
    }

    async updateEmployee(id:number, email:string, name:string): Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneById(id)

        if(existingEmployee){
            const employee = new Employee();
            employee.name=name;
            employee.email=email;
            await this.employeeRepository.update(id,employee)
        }
    }

    async deleteEmployee(id:number): Promise<void> {

        const existingEmployee = await this.employeeRepository.findOneById(id)
        if(existingEmployee){
            await this.employeeRepository.delete(id)
        }
        
    }
}

export default EmployeeService