import { Column, Entity, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {

    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(()=>Address,(address)=> address.employee,{
      cascade: true,
      onDelete: 'CASCADE'
    })
    @JoinColumn()
    address: Address

    @ManyToOne(() => Department, (department) => department.employees)
    department:Department
  }
  
  export default Employee;
  