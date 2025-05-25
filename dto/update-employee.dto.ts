import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested, IsDateString, MinLength, IsEnum} from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeStatus, EmployeeRole } from "../entities/employee.entity";

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  employeeId: string;
  
  @IsNotEmpty()
  @IsNumber()
  department_id: number;
  
  @IsNotEmpty()
  @IsDateString()
  dateOfJoining: Date;
  
  @IsNotEmpty()
  @IsNumber()
  experience: number;
  
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
  
  @IsEnum(EmployeeRole)
  role:EmployeeRole;
  
  @IsEnum(EmployeeStatus)
  status:EmployeeStatus
}