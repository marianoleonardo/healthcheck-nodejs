import * as express from "express";
import { HealthChecker } from "./HealthChecker";

const router = express.Router();
/**
 * Add one endpoints related to health check information.
 * @param healthChecker The HealthChecker object
 */

const addEndPointHealthCheck = (healthChecker: HealthChecker) => {
  router.get('/healthCheck', (req: express.Request, res: express.Response) => {
    res.send(200).json(healthChecker.serviceInfo);
  })

  return router;
}

export = {
  addEndPointHealthCheck
}
