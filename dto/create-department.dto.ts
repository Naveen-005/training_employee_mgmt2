import { IsNotEmpty, IsString, IsNumber} from "class-validator";
import Employee from "../entities/employee.entity";

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber({},{each: true})
  employees: number[];
}