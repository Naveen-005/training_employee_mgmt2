import { Repository } from "typeorm";
import Address from "../entities/address.entity";

class AddressRepository {
    constructor(private repository: Repository<Address>){

    }

    async findByEmpId(empId): Promise<Address>{
        return null
    }
}