export class StateMetaData {
    date;
    last_updated;
    population;
    tested;
    vaccinated;

    mapFromStateMetaDataJson(json) {
        this.date = json?.date ? json?.date : undefined;
        this.last_updated = json?.last_updated ? json?.last_updated : undefined;
        this.population = json?.population ? json?.population : undefined;
        this.tested = json?.tested ? json?.tested : undefined;
        this.vaccinated = json?.vaccinated ? json?.vaccinated : undefined;
    }
}