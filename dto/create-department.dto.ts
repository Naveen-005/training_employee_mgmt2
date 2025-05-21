import { IsNotEmpty, IsString} from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  employees: number[];

}