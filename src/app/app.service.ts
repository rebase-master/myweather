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

    makeUrl(query){
        this.apiURL = this.baseUrl+'?'+query+'&APPID='+this._configuration.ApiKey+'&units=metric';
    }

    //Get user's current location
    getLocation(){
       return this.http.get('http://ipinfo.io/json')
            .map(response => response.json())
            .catch(this.handleError);
    }

    //TODO: Devise a better solution to search city without fetching large json file
    //getLocations(){
    //    return this.http.get('../data/city.list.json')
    //                .map(response => response.json())
    //                .catch(this.handleError);
    //}

    getForecast(){
        return this.http.get(this.apiURL)
        //return this.http.get('../data/sample.json')
                   .map(response => response.json())
                   .catch(this.handleError);
    }

    private handleError(error: Response){
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }

}
