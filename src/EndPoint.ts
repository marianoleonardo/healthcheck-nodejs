import * as express from "express";
import { HealthChecker } from "./HealthChecker";

const router = express.Router();
/**
 * Add one endpoints related to health check information.
 * @param healthChecker The HealthChecker object
 */

const addEndPointHealthCheck = (healthChecker: HealthChecker) => {
  router.get('/healthCheck', (req: express.Request, res: express.Response) => {
    const status = healthChecker.serviceInfo.status;
    switch (status) {
      case 'pass':
        res.send(200).json(healthChecker.serviceInfo);
        break;
      case 'warn':
        res.send(200).json(healthChecker.serviceInfo);
        break;
      case 'fail':
        res.send(500).json(healthChecker.serviceInfo);
        break;
      default:
        res.send(404).json();
    }
  })
  return router;
}

export = {
  addEndPointHealthCheck
}
