import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core-service/http.service';
import { AuthService } from 'src/app/core-service/auth.service';

@Injectable()
export class LoginService {
    private en = environment.apiURL;
    constructor(
        private _http: HttpService,
        private _auth: AuthService) { }

    userlogin(data: any): Observable<any> {
        return this._http.post(this.en, 'LOGIN_API:userlogin', data, null)
    }
    userLoginGet() {
        return this._http.get(this.en, 'LOGIN_API:userlogin', false, { name: "sanoj", salary: 2000 });
    }
    setLoginInfo(data: any): void {
        this._auth.setUserInfo(data);
    }
    userCall(): Observable<any> {
        return this._http.post(this.en, 'LOGIN_API:getFilteredUserByCode', null, null);
    }
}