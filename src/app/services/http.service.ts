import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
    constructor(private _http: HttpClient) {}

    public get(params: HttpParams, url: string) {
        const headers = new HttpHeaders();
        const options = {
            headers: headers,
            params: params
        };

        return this._http.get(url, options);
    }

    public post(params: HttpParams, url: string) {
        const headers = new HttpHeaders();
        const options = {
            headers: headers,
            params: params
        };

        return this._http.post(url, null, options).pipe(
            map(res => {
                return res
            })
        );
    }
}