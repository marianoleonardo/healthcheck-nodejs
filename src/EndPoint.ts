import * as express from "express";
import { HealthChecker } from "./HealthChecker";

const router = express.Router();
/**
 * Add one endpoints related to health check information.
 * @param healthChecker The HealthChecker object
 */

function getHTTPRouter(healthChecker: HealthChecker) {
  router.get("/healthCheck", (_req: express.Request, res: express.Response) => {
    const status = healthChecker.serviceInfo.status;
    switch (status) {
      case "pass":
        res.status(200).json(healthChecker.serviceInfo).send();
        break;
      case "warn":
        res.status(200).json(healthChecker.serviceInfo).send();
        break;
      case "fail":
        res.status(500).json(healthChecker.serviceInfo).send();
        break;
      default:
        res.status(404).json().send();
    }
  });
  return router;
}

export {
  getHTTPRouter,
};
