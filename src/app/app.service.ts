import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Configuration} from './app.constants';

@Injectable()
export class WeatherService{

    private baseUrl: string;
    private apiURL: string;
    private headers: Headers;

    constructor(private http: Http, private _configuration: Configuration){
        this.baseUrl = _configuration.Server+'/'+_configuration.ApiPath;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    //Create the URL for making API call
    makeUrl(query){
      if(this._configuration.ApiKey == null)
        this.apiURL = '../data/sample.json';
      else
        this.apiURL = this.baseUrl+'?'+query+'&APPID='+this._configuration.ApiKey+'&units=metric';
    }

    //Get user's current location
    getLocation(){
       return this.http.get('http://ipinfo.io/json')
            .map(response => response.json())
            .catch(this.handleError);
    }

    //Get weather data from openweathermap API
    getForecast(){
        return this.http.get(this.apiURL)
                   .map(response => response.json())
                   .catch(this.handleError);
    }

    //Handle API error
    private handleError(error: Response){
      return Observable.throw(error.json().error || 'Server error');
    }

}
