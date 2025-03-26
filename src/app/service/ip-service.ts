import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IpService {

    constructor(private httpClient: HttpClient) { }

    getIp(): Observable<any> {
        return this.httpClient.get('https://icanhazip.com/', 
            { 
                observe: 'body', 
                responseType: 'text' as 'text' 
            }
        );
    }

}