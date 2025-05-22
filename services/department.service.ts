import DepartmentRepository from '../repositories/department.repository';
import Employee, { EmployeeRole } from '../entities/employee.entity';
import Address from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import bcrypt from 'bcrypt'
import Department from '../entities/department.entity';
import HttpException from '../exception/httpException';

class DepartmentService {

    constructor(private departmentRepository: DepartmentRepository){}

    async getAllDepartments(): Promise<Department[]> {

        return this.departmentRepository.findMany();
    }

    async getDepartmentByID(id:number): Promise<Department> {
        let department= await this.departmentRepository.findOneById(id)
        if(!department){
            throw new HttpException(401,"Employee not found");
        }
        return department;
    }

    async deleteDepartment(id:number): Promise<void> {

        const existingDepartment = await this.departmentRepository.findOneById(id)
        if(existingDepartment){
            await this.departmentRepository.remove(existingDepartment)
        }
        
    }
}

export default DepartmentService