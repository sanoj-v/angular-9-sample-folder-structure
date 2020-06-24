import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API_END_POINTS } from '../shared/constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
    constructor(
        private _http: HttpClient,
        private _auth: AuthService
    ) {
    }

    get(url: string, endpoint: string, queryParams = false, params: any = null) {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        const queryString = params ? this._objectToQueryString(params) : '';
        const sEp: string[] = endpoint.split(":");
        endpoint = API_END_POINTS[sEp[0]][sEp[1]] + (queryString ? '?' + queryString : '');
        // if (queryParams) {
        //     const sEp: string[] = endpoint.split(":");
        //     endpoint = API_END_POINTS[sEp[0]][sEp[1]] + "/" + params;
        // }
        // else {
        //     const queryString = params ? this._objectToQueryString(params) : '';
        //     const sEp: string[] = endpoint.split(":");
        //     endpoint = API_END_POINTS[sEp[0]][sEp[1]] + (queryString ? '?' + queryString : '');
        // }
        return this._http.get(`${url}${endpoint}`, _options);
    }

    post(url: string, endpoint: string, data: any, isMultipart: boolean = false, params = null) {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        if (isMultipart) {
            _options.append('Content-Type', 'multipart/form-data');
        }
        const queryString = params ? this._objectToQueryString(params) : '';
        const sEp: string[] = endpoint.split(":");
        endpoint = API_END_POINTS[sEp[0]][sEp[1]] + (queryString ? '?' + queryString : '');
        return this._http.post(`${url}${endpoint}`, data, _options);
    }

    postFile(url: string, endpoint: string, data: any, isMultipart: boolean = false, params = null) {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        if (isMultipart) {
            _options.append('Content-Type', 'multipart/form-data');
        }
        const queryString = params ? this._objectToQueryString(params) : '';
        const sEp: string[] = endpoint.split(":");
        endpoint = API_END_POINTS[sEp[0]][sEp[1]] + (queryString ? '?' + queryString : '');
        _options['withCredentials'] = false;
        return this._http.post(`${url}${endpoint}`, data, _options);
    }

    put(url: string, endpoint: string, data: any, params = null) {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        const sEp: string[] = endpoint.split(":");
        endpoint = API_END_POINTS[sEp[0]][sEp[1]];
        return this._http.put(`${url}${endpoint}`, data, _options);
    }

    delete(url: string, endpoint: string, data = {}, params = null) {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        const queryString = params ? this._objectToQueryString(params) : '';
        const sEp: string[] = endpoint.split(":");
        endpoint = API_END_POINTS[sEp[0]][sEp[1]] + (queryString ? '?' + queryString : '');
        return this._http.delete(`${url}${endpoint}`, _options);
    }

    private _objectToQueryString(object) {
        return Object
            .keys(object)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
            .join('&');
    }

    // getRefreshToken() {
    //     try {
    //         return this.cookieService.get('refreshToken');
    //     } catch (e) {
    //         return '';
    //     }
    // }

    // getAccessToken() {
    //     try {
    //         return this.cookieService.get('accessToken');
    //     } catch (e) {
    //         return '';
    //     }
    // }

    postGetFiles(url: string, endpoint: string, data: any, params = null, headers = false): Observable<Blob> {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        const queryString = params ? this._objectToQueryString(params) : '';
        const sEp: string[] = endpoint.split(":");
        endpoint = API_END_POINTS[sEp[0]][sEp[1]] + (queryString ? '?' + queryString : '');
        let head: HttpHeaders = new HttpHeaders({});
        return this._http.post<Blob>(`${url}${endpoint}`, data, { headers: head, responseType: 'blob' as 'json' });
    }

    getFile(url: string, endpoint: string, params = null, headers: boolean = false, filename = null): void {
        let _options: any = {
            'Content-Type': 'application/json'
        };
        if (filename === null) {
            filename = params;
        }
        const sEp: string[] = endpoint.split(":");
        endpoint = `${API_END_POINTS[sEp[0]][sEp[1]]}/${params}`;
        let head: HttpHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + this._auth.getAccessToken
        });
        _options['headers'] = head;
        _options['responseType'] = 'blob';
        this._http.get(`${url}${endpoint}`, _options).subscribe(res => {
            this.downloadFile(res, filename);
        });
    }

    downloadFile(data, filename) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
}