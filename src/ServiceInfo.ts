import { IComponentDetailsDynamic } from "./ComponentDetails";
import { ServiceStatus } from "./types";

interface IServiceInfo {
    // status(required) - indicates whether the service status is acceptable or not.
    status: ServiceStatus;
    
    // version(optional) - public version of the service 
    version?: string;
    
    // releaseId(optional) - 'implementation version'/ 'release number'
    releaseId?: string;
    
    // notes(optional) - array of notes relevant to current state of health
    notes?: Array<string>;
    
    // links(optional) - array of objects containing link relations and URIs
    links?: Array<object>;
    
    // description(optional) - human-friendly description of the service
    description?: string;
}

interface IServiceInfoDynamic extends IServiceInfo {
    // details - object that provides more details about the status of the service
    details?: {
        [componentName: string]: IComponentDetailsDynamic;
    };
    
    // serviceId(optional) - unique identifier of the service, in the application scope
    serviceId?: string;
    
    // output(optional) - raw error output, in case of 'fail' or 'warn' states. It SHOULD
    //                    be ommited for 'pass' state.
    output?: string;
}

export {
    IServiceInfo,
    IServiceInfoDynamic,
};
