import { Column, Entity, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import Department from "./department.entity";

export enum EmployeeRole{
    UI='UI',
    UX='UX',
    DEVELOPER='DEVELOPER',
    HR='HR'
}

export enum EmployeeStatus{
  ACTIVE='ACTIVE',
  INACTIVE='INACTIVE',
  PROBATION='PROBATION'
}

@Entity()
class Employee extends AbstractEntity {

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    employeeId: String

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column({
      type:'enum',
      enum:EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole;

    @OneToOne(()=>Address,(address)=> address.employee,{
      cascade: true
    })
    address: Address

    @ManyToOne(() => Department, (department) => department.employees,{
      onDelete:'CASCADE'
    })
    department:Department

    @Column()
    dateOfJoining: Date

    @Column()
    experience: number

    @Column({
      type:'enum',
      enum:EmployeeStatus,
      default: EmployeeStatus.ACTIVE
    })
    status: EmployeeStatus;

  }


  
  export default Employee;
  