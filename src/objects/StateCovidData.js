import { STATE_LIST } from "../screens/utils/constants";
import { DistrictData } from "./DistrictData";
import { StateData } from "./StateData";
import { StateMetaData } from "./StateMetaData";

class StateCovidData extends StateData {
    name;
    districts;
    districtsList;
    meta;
    dates;

    getStateName() {
        return STATE_LIST[this.name] ? STATE_LIST[this.name] : this.name;
    }

    getDistrictDataByName(name) {
        return this.districts[name];
    }

    getStateDataByDate(date) {
        return this.dates[date]
    }

    getDistrictNameList() {
        return Object.keys(this.districts)
    }

    mapFromDistrictJson(json) {
        const districts = {};
        for (var district in json) {
            if (json.hasOwnProperty(district)) {
                const districtObject = new DistrictData();
                districtObject.mapFromDistrictDataJson(json[district]);
                districtObject.name = district;
                districts[district]= districtObject;
            }
        }
        return districts;
    }

    mapFromStateCovidDataJson(json) {
        this.mapFromStateDataJson(json);
        this.name = json?.name ? json?.name : '';
        let districts = this.mapFromDistrictJson(json?.districts)
        this.districts = districts;
        this.districtsList = this.getDistrictNameList();
        const meta = new StateMetaData();
        meta.mapFromStateMetaDataJson(json?.meta)
        this.meta = meta ? meta : undefined;
        this.totalPopulation = this.meta.population;
        this.confirmedCount = this.total.confirmed;
        this.affectedPercentage = isNaN(this.total.confirmed) ? 0 : Math.round(this.total.confirmed / this.meta.population * 100)
        this.vaccinatedPercentage = isNaN(this.total.vaccinated1) ? 0 : Math.round(this.total.vaccinated1 / this.meta.population * 100)
    }

    mapFromStateDatesJson(json){
        const dates = {};
        for (var date in json?.dates) {
            if (json?.dates.hasOwnProperty(date)) {
                const dateObject = new StateData();
                dateObject.mapFromStateDataJson(json?.dates[date]);
                dateObject.name = this.name;
                let districts = this.mapFromDistrictJson(json?.dates[date]['districts'])
                dateObject.districts = districts;
                dateObject.districtsList = Object.keys(districts);
                dateObject.totalPopulation = this.totalPopulation;
                dateObject.confirmedCount = json?.dates[date]?.total.confirmed;
                dateObject.affectedPercentage = isNaN(json?.dates[date]?.total.confirmed) ? 0 : Math.round(json?.dates[date]?.total.confirmed / this.totalPopulation * 100)
                dateObject.vaccinatedPercentage = isNaN(json?.dates[date]?.total.vaccinated1) ? 0 : Math.round(json?.dates[date]?.total.vaccinated1 / this.totalPopulation * 100)
                dates[date]= dateObject;
            }
        }
        this.dates = dates ? dates : undefined
    }
}

export default StateCovidData;