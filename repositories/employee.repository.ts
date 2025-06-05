import { In, Repository } from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>){

    }

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
        
    }

    async findMany(): Promise<Employee[]>{
        return this.repository.find({
            relations:{
                address:true
            }
        });
    }

    async findManyById(ids:number[]): Promise<Employee[]>{
        return this.repository.find({ where: { id: In([...ids]) } });
    }

    async findOneById(id: number): Promise<Employee> {
        return this.repository.findOne({
            where:{id},
            relations:{
                address:true,
                department:true
            }
        });
    }

    async findByEmail(email:string): Promise<Employee | null> {
        return this.repository.findOneBy({email});
    }

    async update(id:number, employee:Employee):Promise<void> {
        await this.repository.save(employee);
    }

    async delete(id:number): Promise<void> {
        await this.repository.delete({id})
    }

    async remove(employee:Employee): Promise<void> {
        await this.repository.remove(employee)
    }

}

export default EmployeeRepository