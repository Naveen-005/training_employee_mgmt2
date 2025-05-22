import express, { Request, Response } from "express";
import loggerMiddleware from "./loggerMiddleware";
import { processTimeMiddleware } from "./processTimeMiddleware";
import dataSource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import { errorMiddleware } from "./errorMiddleware";
import {authRouter} from "./routes/auth.route"
import { authMiddleware } from "./authMiddleware";


const server = express();
server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);



server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

server.use("/employees",authMiddleware,employeeRouter);
server.use("/auth",authRouter);

server.use(errorMiddleware);

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


