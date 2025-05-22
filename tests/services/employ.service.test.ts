import {mock, MockProxy} from 'jest-mock-extended'
import {when} from 'jest-when'
import EmployeeRepository from '../../repositories/employee.repository'
import EmployeeService from '../../services/employee.service'
import Employee from '../../entities/employee.entity'

describe('EmployeeService',() => {

    let employeeRepositoryMock:MockProxy<EmployeeRepository>
    let employeeService:EmployeeService

    beforeEach(()=>{
        employeeRepositoryMock=mock<EmployeeRepository>();
        employeeService=new EmployeeService(employeeRepositoryMock)
    })

    describe('getEmployeeById', ()=>{

        it('return a valid employee with valid id',async()=>{

            const tmpEmployee1={
                name:"anoop",
                id:1,
                age:22
            } as Employee
            when(employeeRepositoryMock.findOneById).calledWith(1).mockReturnValue(tmpEmployee1);

            const result=await employeeService.getEmployeeByID(1);
            expect(result).toStrictEqual(tmpEmployee1)
            expect(employeeRepositoryMock.findOneById).toHaveBeenCalledWith(1)
        })

        it('throw error when id is invalid',async()=>{

            when(employeeRepositoryMock.findOneById).calledWith(5).mockReturnValue(null);

            expect(employeeService.getEmployeeByID(5)).rejects.toThrow("Employee not found");
            expect(employeeRepositoryMock.findOneById).toHaveBeenCalledWith(5)
        })

    })

})