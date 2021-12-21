import { Delta21_14Data, Delta7Data, DeltaData, TotalData } from "./CovidDataContent";

export class StateData {
    delta;
    delta21_14;
    delta7;
    total;
    totalPopulation;
    confirmedCount;
    affectedPercentage;
    vaccinatedPercentage;
    slideList=['total', 'delta', 'delta7']

    mapFromStateDataJson(json) {
        this.delta = new DeltaData();
        this.delta.mapFromCovidDataContentJson(json?.delta)

        this.delta21_14 = new Delta21_14Data();
        this.delta21_14.mapFromCovidDataContentJson(json?.delta21_14)

        this.delta7 = new Delta7Data();
        this.delta7.mapFromCovidDataContentJson(json?.delta7)

        this.total = new TotalData();
        this.total.mapFromCovidDataContentJson(json?.total)
    }
}