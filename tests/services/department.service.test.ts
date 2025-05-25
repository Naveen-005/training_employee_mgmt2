import {mock, MockProxy} from 'jest-mock-extended'
import {when} from 'jest-when'
import DepartmentRepository from '../../repositories/department.repository'
import EmployeeRepository from '../../repositories/employee.repository'
import DepartmentService from '../../services/department.service'
import Department from '../../entities/department.entity'
import Employee from '../../entities/employee.entity'
import { CreateDepartmentDto } from '../../dto/create-department.dto'

describe('DepartmentService',()=>{
    let MockDepartmentRepository:MockProxy<DepartmentRepository>
    let MockEmployeeRepository:MockProxy<EmployeeRepository>
    let departmentService:DepartmentService

    beforeEach(()=>{
        MockEmployeeRepository=mock<EmployeeRepository>();
        MockDepartmentRepository=mock<DepartmentRepository>();
        departmentService=new DepartmentService(MockDepartmentRepository,MockEmployeeRepository)
    })

    describe('getAllDepartments',() => {
        it('Get all departments', async() => {

            const tmpEmployeeList=[{

                id:1
            }, {

                id:2
            }] as Employee[]

            const departmentList=[
                {
                    "id": 1,
                    "name": "Marketing",
                    "employees": tmpEmployeeList
                
                }
            ] as Department[]

            when(MockDepartmentRepository.findMany).calledWith().mockReturnValue(departmentList)
            const result= await departmentService.getAllDepartments()

            expect(result).toStrictEqual(departmentList)
            expect(MockDepartmentRepository.findMany).toHaveBeenCalled
        })
    })

    describe('Get department by id', () => {
        it('Should return details of the department using its id', async() => {

            const tmpEmployeeList=[{

                id:1
            }, {

                id:2
            }] as Employee[]
            const tmpDepartment = {
                "id": 1,
                "name": "Marketing",
                "employees": tmpEmployeeList
                
            }as Department

            when(MockDepartmentRepository.findOneById).calledWith(1).mockReturnValue(tmpDepartment)

            const result= await departmentService.getDepartmentByID(1)

            expect(result).toStrictEqual(tmpDepartment)
            expect(MockDepartmentRepository.findOneById).toHaveBeenCalledWith(1)
        })

        it('should throw error when id is invalid', async() => {

            when(MockDepartmentRepository.findOneById).calledWith(2).mockReturnValue(null)

            expect(departmentService.getDepartmentByID(2)).rejects.toThrow("Department not found")
            expect(MockDepartmentRepository.findOneById).toHaveBeenCalledWith(2)
        })
    })

    describe('create department',() => {

        it('Should return the newly created department', async() => {
            
            const newDepartment = {
                "name": "Public Relations",
                "employees": [1,2]
            } as CreateDepartmentDto

            const tmpEmployeeList=[{

                id:1
            }, {

                id:2
            }] as Employee[]

            const creatDepartmentInput = {

                "name": "Public Relations",
                "employees": tmpEmployeeList
                
            }as Department

            const creatDepartmentOutput = {
                "id": 1,
                "name": "Public Relations",
                "employees": tmpEmployeeList
                
            }as Department

            when(MockEmployeeRepository.findManyById).calledWith(newDepartment.employees).mockReturnValue(tmpEmployeeList)
            when(MockDepartmentRepository.create).calledWith(creatDepartmentInput).mockReturnValue(creatDepartmentOutput)

            const result = await departmentService.createDepartment(newDepartment)

            expect(result).toStrictEqual(creatDepartmentOutput)
            expect(MockEmployeeRepository.findManyById).toHaveBeenCalledWith(newDepartment.employees)
            expect(MockDepartmentRepository.create).toHaveBeenCalledWith(creatDepartmentInput)

        })
    })

    describe('update department', () => {

        it('Should update the details of a department and return a promise', async() => {

            const tmpEmployeeList=[{id:1}] as Employee[]

            const tmpEmployeeList2=[{id:2}] as Employee[]

            const tmpEmployeeList3=[{
                id:1
            },{
                id:2
            }] as Employee[]

            const tmpDepartment = {
                "id": 1,
                "name": "Marketing",
                "employees": tmpEmployeeList
                
            }as Department

            const tmpDepartment2 = {
                "id": 1,
                "name": "Public Relations",
                "employees": tmpEmployeeList3
                
            }as Department

            const updateDepartmentInput = {
                "name": "Public Relations",
                "employees": [2]
            } as CreateDepartmentDto

            when(MockDepartmentRepository.findOneById).calledWith(1).mockReturnValue(tmpDepartment)
            when(MockEmployeeRepository.findManyById).calledWith(updateDepartmentInput.employees).mockReturnValue(tmpEmployeeList2)

            await departmentService.updateDepartment(1,updateDepartmentInput)

            expect(MockDepartmentRepository.findOneById).toHaveBeenCalledWith(1)
            expect(MockEmployeeRepository.findManyById).toHaveBeenCalledWith(updateDepartmentInput.employees)
            expect(MockDepartmentRepository.update).toHaveBeenCalledWith(tmpDepartment2)

        })

        it('shoud throw error when id is invalid', async() => {

            const tmpDepartment = {
                "name": "Public Relations",
                "employees": [1,2]
            } as CreateDepartmentDto

            const tmpEmployeeList=[{

                id:1
            }, {

                id:2
            }] as Employee[]


            when(MockDepartmentRepository.findOneById).calledWith(2).mockReturnValue(null)

            expect(departmentService.updateDepartment(2,tmpDepartment)).rejects.toThrow("Department does not exist")
            expect(MockDepartmentRepository.findOneById).toHaveBeenCalledWith(2)
        })

    })

    describe('delete department', () => {

        it('Delete department if id is valid', async() => {

            const tmpDepartment = {
                "name": "Public Relations",
                "employees": [1,2]
            } as CreateDepartmentDto

            const tmpEmployeeList=[{

                id:1
            }, {

                id:2
            }] as Employee[]

            when(MockDepartmentRepository.findOneById).calledWith(1).mockReturnValue(tmpDepartment)

            await departmentService.deleteDepartment(1)

            expect(MockDepartmentRepository.remove).toHaveBeenCalledWith(tmpDepartment)
        })

        it('throw error if is invalid', async () => {

            when(MockDepartmentRepository.findOneById).calledWith(2).mockReturnValue(null)

            expect(departmentService.deleteDepartment(2)).rejects.toThrow("Department does not exist")
            expect(MockDepartmentRepository.findOneById).toHaveBeenCalledWith(2)
        })
    })
})