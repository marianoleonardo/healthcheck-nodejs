import util = require("util");
import { IComponentDetails } from "./ComponentDetails";
import { DataTrigger } from "./DataTrigger";
import { Collector, HealthChecker } from "./HealthChecker";
import { IServiceInfoDynamic } from "./ServiceInfo";

const config: IServiceInfoDynamic = {
  description: "sample service",
  links: [{about: "http://github.com/dojot"}],
  notes: ["note this!"],
  releaseId: "alpha",
  status: "pass",
  version: "1.0.0-alpha.1",
};

const healthChecker = new HealthChecker(config);

const monitor: IComponentDetails = {
  componentId: "service-memory-1",
  componentName: "total memory used",
  componentType: "system",
  links: [{info: "http://github.com/dojot/measurements"}],
  measurementName: "memory",
  observedUnit: "bytes",
  status: "pass",
};

let i = 0;
const collector: Collector = (trigger: DataTrigger) => {
  i += 5;
  // tslint:disable-next-line:no-console
  console.log("incrementing i: " + i);
  if (i > 20) {
    trigger.trigger(i, "fail", "i too high");
  }
  return i;
};

healthChecker.registerMonitor(monitor, collector, 2000);

function printStatus() {
  // tslint:disable-next-line:no-console
  console.log(`current status: ${util.inspect(config, {depth: null})}`);
  setTimeout(() => {
    printStatus();
  }, 1000);
}
setTimeout(() => {
  printStatus();
}, 1000);
