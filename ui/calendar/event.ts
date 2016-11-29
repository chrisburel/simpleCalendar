import moment = require('moment');

export class Event {
    public id: number;
    public startDate;
    public endDate;
    public description: string;
    public isAllDay: boolean;

    public fromArrayData(fields:Array<string>, values:Array<string>) {
        for (let i = 0; i < values.length; ++i) {
            if (fields[i] === "startDate" || fields[i] === "endDate") {
                if (values[i]) {
                    values[i] = moment(values[i]);
                }
            }
            this[fields[i]] = values[i];
        }
    }
}
