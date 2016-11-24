import {WeatherModel} from "./app.model";

export class WeekWeatherModel{

    day: string;
    dayWeather: {name: string, weather: any}[] = [];

    constructor(weekWeather:any){
      this.day = weekWeather.day;
      this.dayWeather.push({
        name: weekWeather.dayWeather.name,
        weather: new WeatherModel(weekWeather.dayWeather.weather)
      });
    }

}
