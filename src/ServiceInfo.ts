import { IComponentDetailsDynamic } from "./ComponentDetails";
import { ServiceStatus } from "./types";

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

export {
    IServiceInfo,
    IServiceInfoDynamic,
};
