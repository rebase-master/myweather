import { Component, OnInit } from '@angular/core';
import {WeatherService} from "./app.service";
import {Configuration} from "./app.constants";
import {WeatherModel} from "./app.model";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [WeatherService, Configuration],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  public weather: WeatherModel[] = [];
  public currentWeather: WeatherModel;

  constructor(private _weatherService: WeatherService){}

  ngOnInit(){
    this.forecastByCityName('lucknow');
    //this.forecastByCityId(524901);
    //this.forecastByCoords(35,139 );
  }

  formatWeather(data){
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var weekdayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    console.log("got in formatweather: \n");
    //console.log(data.list);
    for(var i=0;i<data.list.length;i++){
      var list = data.list[i];
      var main = list['main'],
        weatherIcon = list['weather'][0]['icon'],
        weatherDescription = list['weather'][0]['description'],
        wind = list['wind'],
        date = new Date(list['dt']*1000);
      //console.log("f:\n");
      //console.log(f);
      var obj = {
        "temp":                 main.temp,
        "pressure":             main.pressure,
        "humidity":             main.humidity,
        "temp_min":             main.temp_min,
        "temp_max":             main.temp_max,
        "weather_icon":         "http://openweathermap.org/img/w/"+weatherIcon+".png",
        "weather_description":  weatherDescription,
        "date":                 weekdayName[date.getDay()]+", "+ monthNames[date.getMonth()]+" "+date.getDate(),
        "wind": {
          "speed": wind['speed'],
          "degree": wind['degree']
        }
      };
      this.weather.push(
        new WeatherModel(obj)
      );
    }

    //console.log("DATA: \n");
    //console.log(this.weather);
    this.currentWeather = this.weather[0];
    console.log(this.currentWeather);
  }

  forecastByCityName(city) {
    this._weatherService.makeUrl('q=' + city);
    this._weatherService.getForecast()
      .subscribe(data => {
        this.formatWeather(data);
      });
  }

  forecastByCityId(id){
    this._weatherService.makeUrl('id='+parseInt(id));
    this._weatherService.getForecast()
      .subscribe(data => {
        console.log(data);
      });

  }

  forecastByCoords(lat,lon){
    this._weatherService.makeUrl('lat='+lat+'&lon='+lon);
    this._weatherService.getForecast()
      .subscribe(data => {
        console.log(data);
      });

  }
}
