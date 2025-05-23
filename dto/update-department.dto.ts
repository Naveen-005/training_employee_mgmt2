import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDto {

    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNumber({},{each: true})
    employees: number[];
}