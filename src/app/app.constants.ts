import {Injectable} from '@angular/core';
import {CONFIG} from '../config/app.config';

@Injectable()
export class Configuration{
    public Server:  string = CONFIG.apiEndpoint;
    public ApiPath: string = CONFIG.apiPath;
    public ApiKey:  string = CONFIG.apiKey;
}

