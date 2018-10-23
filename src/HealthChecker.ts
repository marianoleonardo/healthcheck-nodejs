import { IComponentDetails, IComponentDetailsDynamic } from "./ComponentDetails";
import { DataTrigger } from "./DataTrigger";
import { IServiceInfo, IServiceInfoDynamic } from "./ServiceInfo";

type Collector = (trigger: DataTrigger) => any;

class HealthChecker {
    private serviceInfo: IServiceInfoDynamic;

    constructor(config: IServiceInfo) {
        this.serviceInfo = config;
    }

    public registerMonitor(monitor: IComponentDetails, collectFn?: Collector, periodicity?: number): DataTrigger {
        const fullMonitor: IComponentDetailsDynamic = monitor;
        const monitorId = `${monitor.componentName}:${monitor.measurementName}`;
        const dataTrigger = new DataTrigger(this.serviceInfo, fullMonitor);
        if (periodicity && collectFn) {
            this.runCollector(fullMonitor, dataTrigger, collectFn, periodicity);
        }
        this.serviceInfo.detail = {};
        this.serviceInfo.detail[monitorId] = fullMonitor;
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
