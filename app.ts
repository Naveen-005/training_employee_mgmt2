import express, { Request, Response } from "express";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { processTimeMiddleware } from "./middlewares/processTimeMiddleware";
import dataSource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import {authRouter} from "./routes/auth.route"
import { authMiddleware } from "./middlewares/authMiddleware";
import { LoggerService } from "./services/logger.service";
import { departmentRouter } from "./routes/department.route";

const server = express();
const logger = LoggerService.getInstance('app()');


server.use(express.json());
server.use(loggerMiddleware);
server.use(processTimeMiddleware);



server.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

server.use("/employees",authMiddleware,employeeRouter);
server.use("/departments",authMiddleware,departmentRouter)
server.use("/auth",authRouter);

server.use(errorMiddleware);

(async()=>{
  try{
    await dataSource.initialize();
    logger.info('Database connected');
  }catch (e){
    logger.error(`Failed to connect to DB - ${e}`)
    process.exit(1);
  }
  server.listen(3000, () => {
    logger.info("server listening to 3000");
  });
})();


