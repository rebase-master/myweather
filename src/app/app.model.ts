export class WeatherModel{

     temp:     string;
     pressure: string;
     humidity: string;
     temp_min: string;
     temp_max: string;
     weather_icon: string;
     weather_description:     string;
     date:  string;
     wind:  any;

    constructor(weather:any){
        this.temp     = weather.temp;
        this.pressure = weather.pressure;
        this.humidity = weather.humidity;
        this.temp_min = weather.temp_min;
        this.temp_max = weather.temp_max;
        this.weather_icon = weather.weather_icon;
        this.weather_description = weather.weather_description;
        this.date   = weather.date;
        this.wind = weather.wind;
    }
}
