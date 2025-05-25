import DepartmentRepository from '../repositories/department.repository';
import Department from '../entities/department.entity';
import HttpException from '../exception/httpException';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import EmployeeRepository from '../repositories/employee.repository';

class DepartmentService {

    constructor(private departmentRepository: DepartmentRepository, private employeeRepository: EmployeeRepository){}

    async getAllDepartments(): Promise<Department[]> {

        return this.departmentRepository.findMany();
    }

    async getDepartmentByID(id:number): Promise<Department> {
        let department= await this.departmentRepository.findOneById(id)
        if(!department){
            throw new HttpException(404,"Department not found");
        }
        return department;
    }

    async createDepartment(department:CreateDepartmentDto): Promise<Department> {
        const newDepartment=new Department()
        newDepartment.name=department.name
        newDepartment.employees=await this.employeeRepository.findManyById(department.employees)

        return await this.departmentRepository.create(newDepartment)
    }

    async updateDepartment(id:number,updatedDetails:CreateDepartmentDto): Promise<void> {

        const department=await this.departmentRepository.findOneById(id)
        if(department){
            
            if(updatedDetails.name){
                department.name=updatedDetails.name
            }
            if(updatedDetails.employees){
                const newEmployees =await this.employeeRepository.findManyById(updatedDetails.employees)
                //console.log(newEmployees)
                department.employees = [...department.employees, ...newEmployees]
            }
          
        }else{
            
            throw new HttpException(404,"Department does not exist")
        }

        await this.departmentRepository.update(department)
    }

    async deleteDepartment(id:number): Promise<void> {

        const existingDepartment = await this.departmentRepository.findOneById(id)
        if(existingDepartment){
            await this.departmentRepository.remove(existingDepartment)
        }else{
            throw new HttpException(404,"Department does not exist")
        }
        
    }
}

export default DepartmentService