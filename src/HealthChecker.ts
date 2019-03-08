import { IComponentDetails, IComponentDetailsDynamic } from "./ComponentDetails";
import { DataTrigger } from "./DataTrigger";
import { IServiceInfo, IServiceInfoDynamic } from "./ServiceInfo";

type Collector = (trigger: DataTrigger) => any;

class HealthChecker {
    public serviceInfo: IServiceInfoDynamic;

    constructor(config: IServiceInfo) {
        this.serviceInfo = config;
        this.serviceInfo.details = {};
    }

    public registerMonitor(monitor: IComponentDetails, collectFn?: Collector, periodicity?: number): DataTrigger {
        const fullMonitor: IComponentDetailsDynamic = monitor;
        let monitorId;
        // It is expected that at least one of them is defined
        if (monitor.componentName) {
            if (monitor.measurementName) {
                monitorId = `${monitor.componentName}:${monitor.measurementName}`;
            }
            else {
                monitorId = `${monitor.componentName}`;
            }
        }
        else {
            monitorId = `${monitor.measurementName}`;
        }
        const dataTrigger = new DataTrigger(this.serviceInfo, fullMonitor);
        if (periodicity && collectFn) {
            this.runCollector(fullMonitor, dataTrigger, collectFn, periodicity);
        }
        if (this.serviceInfo.details) {
            this.serviceInfo.details[monitorId] = fullMonitor;
        }
        return dataTrigger;
    }

    private runCollector(
        fullMonitor: IComponentDetailsDynamic,
        dataTrigger: DataTrigger,
        collectFn: Collector,
        periodicity: number,
    ) {
        setTimeout(() => {
            fullMonitor.observedValue = collectFn(dataTrigger);
            this.runCollector(fullMonitor, dataTrigger, collectFn, periodicity);
        }, periodicity);
    }
}

export {
    Collector,
    HealthChecker,
};
