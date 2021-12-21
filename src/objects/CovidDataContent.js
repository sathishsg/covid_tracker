import { NO_DATA_FOUND } from "../screens/utils/constants";

class CovidDataContent {
    confirmed;
    deceased;
    recovered;
    tested;
    vaccinated1;
    vaccinated2;

    mapFromCovidDataContentJson(json) {
        this.confirmed = json?.confirmed ? json?.confirmed : NO_DATA_FOUND;
        this.deceased = json?.deceased ? json?.deceased : NO_DATA_FOUND;
        this.recovered = json?.recovered ? json?.recovered : NO_DATA_FOUND;
        this.tested = json?.tested ? json?.tested : NO_DATA_FOUND;
        this.vaccinated1 = json?.vaccinated1 ? json?.vaccinated1 : NO_DATA_FOUND;
        this.vaccinated2 = json?.vaccinated2 ? json?.vaccinated2 : NO_DATA_FOUND;
    }
}


export class TotalData extends CovidDataContent{
    name = 'Total';
    mapFromTotalDataJson(json){
        this.mapFromCovidDataContentJson(json);
    }
}

export class DeltaData extends CovidDataContent{
    name = 'Delta';
    mapFromDeltaDataJson(json){
        this.mapFromCovidDataContentJson(json);
    }
}

export class Delta7Data extends CovidDataContent{
    name = 'Delta 7';
    mapFromDelta7DataJson(json){
        this.mapFromCovidDataContentJson(json);
    }
}

export class Delta21_14Data extends CovidDataContent{
    name = 'Delta21_14';
    mapFromDelta21_14DataJson(json){
        this.mapFromCovidDataContentJson(json);
    }
}