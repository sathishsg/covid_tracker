import { DistrictMetaData } from "./DistrictMetaData";
import { StateData } from "./StateData";


export class DistrictData extends StateData {
    name;
    meta;

    mapFromDistrictDataJson(json) {
        this.mapFromStateDataJson(json);
        this.name = json?.name ? json?.name : '';
        const meta = new DistrictMetaData();
        meta.mapFromDistrictMetaDataJson(json?.meta)
        this.meta = meta ? meta : undefined;
    }
}