import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { LocalService } from './local-service';

@Injectable({
    providedIn: 'root'
})
export class IpService {

    constructor(private localService: LocalService, private httpClient: HttpClient) { }

    getIp(): Observable<any> {
        return this.httpClient.get('http://icanhazip.com/', 
            { 
                observe: 'body', 
                responseType: 'text' as 'text' 
            }
        );
    }

}