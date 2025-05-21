import express, { Request, Response } from "express";
import loggerMiddleware from "./loggerMiddleware";
import { processTimeMiddleware } from "./processTimeMiddleware";
import dataSource from "./db/data-source";
import employeeRouter from "./routes/employee.route";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);

server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

server.use("/employees", employeeRouter);

(async()=>{
  try{
    await dataSource.initialize();
    console.log('connected');
  }catch{
    console.error('Failed to connect to DB')
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();


