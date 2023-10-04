import { calculateRemainingTime, convertToDateTime } from "./TodoCalculations";

 describe('calculateRemainingTime', () => { 
    it('should calculate timedifference between two dates', () => {

        const simulatedDateNow = '2020-01-01T12:00:00';
        const simulatedDeadline = '2020-01-02T13:10:20';

        const result = calculateRemainingTime(simulatedDateNow, simulatedDeadline);

        expect(result).toEqual({
            years: 0,
            months: 0,
            days: 1,
            hours: 1,
            minutes: 10,
            seconds: 20,
        });
    });
 });

 describe('convertToDateTime', () => { 
    it('should convert to YYYY-MM-DDTHH-MM-SS', () => {

        const date = new Date(2023,1,1,4,0,0);
        const result = convertToDateTime(date);

        expect(result).toEqual("2023-02-01T04:00:00");
    });
 });