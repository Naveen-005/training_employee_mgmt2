import express from "express";
import Employee from "./employee.entity";
import dataSource from "./data-source";

const employeeRouter = express.Router();


employeeRouter.get("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const employees= await employeeRepository.find()
  //console.log(employees)
  res.status(200).send(employees)
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params.id);
  const employeeRepository = dataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id:empId})
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  //console.log(req.body);
  const employeeRepository = dataSource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  await employeeRepository.save(newEmployee);
  res.status(201).send(newEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const empId = Number(req.params.id);
  const tmpEmployee = await employeeRepository.findOneBy({id:empId})
  await  employeeRepository.remove(tmpEmployee)
  res.status(204).send("Employee removed");
});

employeeRouter.put("/:id", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const empId = Number(req.params.id);
  await employeeRepository.update(empId,{
    email: req.body.email,
    name: req.body.name
  })
  const updatedEmployee = await employeeRepository.findOneBy({id:empId})
  console.log("update employees");
  res.status(200).send(updatedEmployee);
});

employeeRouter.patch("/:id", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const empId = Number(req.params.id);
  //console.log(req.body)
  const updated= await employeeRepository.update(empId,req.body)
  //console.log(updated)
  const updatedEmployee = await employeeRepository.findOneBy({id:empId})
  console.log("update employees");
  res.status(200).send(updatedEmployee);
});

export default employeeRouter;
