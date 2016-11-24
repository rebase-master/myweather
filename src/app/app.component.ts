import { Component, OnInit } from '@angular/core';
import {WeatherService} from "./app.service";
import {Configuration} from "./app.constants";
import {WeatherModel} from "./app.model";
import {Observable} from "rxjs/Rx";
import {Location} from "./location.interface";
import {WeekWeatherModel} from "./app.weekweather.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [WeatherService, Configuration],
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  public currentWeather: WeatherModel;
  public today: WeekWeatherModel;
  public nextDays: WeekWeatherModel[] = [];
  public location: string;
  public hasError: boolean;

  constructor(private _weatherService: WeatherService){}

  ngOnInit(){

    this.hasError = false;
    this.getUserLocation();
  }

  loadWeatherData(query){
    this.forecastByCityName(query);
  }

  //Call service method to get user's city and country
  getUserLocation(){
    this._weatherService.getLocation()
        .subscribe(data => {
          this.location = data.city+","+data.country;
          this.forecastByCityName(this.location);
        })
  }


  //Store data from weather API into weather model
  formatWeather(data) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var weekdayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.location = data.city.name + "," + data.city.country;

    var dateToday = new Date();

    for (var i = 0; i < data.list.length; i++) {

      var list = data.list[i],
        main = list['main'],
        weather = list['weather'][0],
        wind = list['wind'],
        date = new Date(list['dt_txt'].replace(' ', 'T')),
        dayName = weekdayName[date.getDay()],
        shortDayName = dayName.substr(0, 3),
        dayTime,
        hour,
        obj
        ;

      obj = {
        "main": {
          "temp": main.temp,
          "temp_min": main.temp_min,
          "temp_max": main.temp_max,
          "humidity": main.humidity,
        },
        "day": dayName,
        "weather": {
          "icon": "http://openweathermap.org/img/w/" + weather['icon'] + ".png",
          "description": weather['description'],
        },
        "date": monthNames[date.getMonth()] + " " + date.getDate(),
        "wind": {
          "speed": wind['speed'],
          "degree": wind['degree']
        }
      };

      hour = date.getHours();

      if (hour == 6) {
        dayTime = 'morning';
      }
      else if (hour == 12) {
        dayTime = 'noon';
      }
      else if (hour == 18) {
        dayTime = 'evening';
      }
      else if (hour == 21) {
        dayTime = 'night';
      } else {
        dayTime = null;
      }

      if (dayTime != null) {
        var index = this.inArray(this.nextDays, shortDayName);
        if (index == -1) {
          this.nextDays.push(new WeekWeatherModel({
            day: shortDayName,
            dayWeather: {
              name: dayTime,
              weather: obj
            }
          }));
        } else {
          this.nextDays[index].dayWeather.push({
            name: dayTime,
            weather: obj
          })
        }//else

      }//if

    }//for loop

    this.today = this.nextDays.shift();
    this.currentWeather = this.today['dayWeather'].shift()['weather'];

  }//formatweather

  inArray(o, item){
    var index = -1;
    o.some(function (x) {
      if( x['day'].localeCompare(item) == 0){
        index  = o.indexOf(x);
        return index;
      }
    });
    return index ;
  }

  //Call service method to get weather data from API
  forecastByCityName(city) {
    this.currentWeather = null;
    this.nextDays = [];
    this._weatherService.makeUrl('q=' + city);
    this._weatherService.getForecast()
      .subscribe(data => {
          this.formatWeather(data);
          this.hasError = false;
      },
      error => {
        this.hasError = true;
      });
  }

}
