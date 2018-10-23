import { ServiceStatus } from "./types";

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

export {
    IComponentDetails,
    IComponentDetailsDynamic,
};
