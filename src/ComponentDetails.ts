import { ServiceStatus } from "./types";

interface IComponentDetails {
    // status(optional) - has the same meaning as the top-level 'status' element
    status?: ServiceStatus;

    // componentName(optional) - human-readable name for the component
    componentName?: string;

    // measurementName(optional) - name of the measurement type (a data point type) that
    //                             the status is reported for
    measurementName?: "utilization" | "responseTime" | "connections" | "uptime" | string;

    // componentId(optional) - unique identifier of an instance of a specific sub-component/dependency
    //                         of a service
    componentId?: string;

    // componentType - type of the component. SHOULD be present if componentName is present.
    componentType?: "component" | "datastore" | "system" | string;

    // observedUnit - identifies the unit of measurement. SHOULD be present if observedvalue is
    //                present
    observedUnit?: string;

    // links(optional) - has the same meaning as the top-lelve 'links' element
    links?: object[];
}

interface IComponentDetailsDynamic extends IComponentDetails {
    // observedValue(optional) - observed value
    observedValue?: any;
    // output(optional) - has the same meaning as the top-level 'output'
    output?: string;

    // time - date-time at which the reading of the observed value was recorded.
    time?: string;
}

export {
    IComponentDetails,
    IComponentDetailsDynamic,
};
