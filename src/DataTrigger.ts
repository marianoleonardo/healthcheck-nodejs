import { IComponentDetailsDynamic } from "./ComponentDetails";
import { IServiceInfoDynamic } from "./ServiceInfo";
import { ServiceStatus } from "./types";

class DataTrigger {
    protected fullMonitor: IComponentDetailsDynamic;
    protected serviceInfo: IServiceInfoDynamic;

    constructor(
        serviceInfo: IServiceInfoDynamic,
        monitor: IComponentDetailsDynamic,
    ) {
        this.fullMonitor = monitor;
        this.serviceInfo = serviceInfo;
    }

    public trigger(data: any, status?: ServiceStatus, output?: string) {
        this.fullMonitor.observedValue = data;
        this.fullMonitor.status = status || "pass";
        this.fullMonitor.output = output || "no-reason";

        if (this.fullMonitor.status !== "pass") {
            if (this.serviceInfo.status !== "fail") {
                this.serviceInfo.status = this.fullMonitor.status;
            }
        } else {
            // This is easier than keep track of everytime the user calls
            // this function.
            let warnings = 0;
            let failures = 0;
            if (this.serviceInfo.detail === undefined) {
                return;
            }
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
    }
}

export {
    DataTrigger,
};
