export class WeatherModel{

    main: any;
    weather: any;
    date:  string;
    wind:  any;

    constructor(weather:any){
        this.main = weather.main;
        this.weather  = weather.weather;
        this.date     = weather.date;
        this.wind     = weather.wind;
    }
}
