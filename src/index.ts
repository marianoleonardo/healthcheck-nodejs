type ServiceStatus = "pass" | "fail" | "warn";
interface IComponentDetails {
  status: ServiceStatus;
  componentName?: string;
  measurementName?: "utilization" | "responseTime" | "connections" | "uptime" | string;
  componentId?: string;
  componentType?: "component" | "datastore" | "system" | string;
  observedUnit?: string;
  links?: string;
}

interface IComponentDetailsDynamic extends IComponentDetails {
  observedValue?: any;
  output?: string;
  time?: string;
}

interface IServiceInfo {
  status: ServiceStatus;
  version?: string;
  releaseId?: string;
  notes?: string;
  links?: string;
  description?: string;
}

interface IServiceInfoDynamic extends IServiceInfo {
  detail?: {
    [componentName: string]: IComponentDetailsDynamic;
  };
  serviceId?: string;
  output?: string;
}

type DataTrigger = (data: any, status?: ServiceStatus, output?: string) => void;

class HealthChecker {
  private serviceInfo: IServiceInfoDynamic;

  constructor(config: IServiceInfo) {
    this.serviceInfo = this.serviceInfo;
  }

  public registerMonitor(monitor: IComponentDetails): DataTrigger  {
    const fullMonitor: IComponentDetailsDynamic = monitor;
    const monitorId = `${monitor.componentName}:${monitor.measurementName}`;
    const dataTrigger: DataTrigger = (data: any, status?: ServiceStatus, output?: string) => {
      fullMonitor.observedValue = data;
      fullMonitor.status = status || "pass";
      fullMonitor.output = output || "no-reason";

      if (fullMonitor.status !== "pass") {
        if (this.serviceInfo.status !== "fail") {
          this.serviceInfo.status = fullMonitor.status;
        }
      } else {
        // This is easier than keep track of everytime the user calls
        // this function.
        let warnings = 0;
        let failures = 0;
        for (const component in this.serviceInfo.detail) {
          if (this.serviceInfo.detail.hasOwnProperty(component)) {
            if (this.serviceInfo.detail[component].status === "fail") {
              failures++;
            } else if (this.serviceInfo.detail[component].status === "warn") {
              warnings++;
            }
            if (failures !== 0) {
              this.serviceInfo.status = "fail";
            } else if (warnings !== 0) {
              this.serviceInfo.status = "warn";
            } else {
              this.serviceInfo.status = "pass";
            }
          }
        }
      }
    };

    this.serviceInfo.detail[monitorId] = fullMonitor;

    return dataTrigger;
  }
}
