import * as express from "express";
import { HealthChecker } from './HealthChecker'
/**
 * Add one endpoints related to health check information.
 * @param app The express application
 */
const addEndPointHealthCheck = (app: express.Application, healthChecker: HealthChecker) => {
  app.get('/healthCheck', (req: express.Request, res: express.Response) => {
    res.send(200).json(healthChecker.serviceInfo);
  });
}
  app.get('/healthCheck', (req: express.Request, res: express.Response) => {
    res.send(200).json(HealthChecker.prototype.serviceInfo);
  });
}

export = {
  addEndPointHealthCheck,
}
