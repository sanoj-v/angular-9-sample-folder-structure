import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
    constructor(
        private _router: Router
    ) { }
    get getUserInfo() {
        return "sanoj";
    }
    set setUserInfo(d: any) {

    }

    public set setToken(d: { access_token: string, refresh_token: string }) {
        let at = localStorage.getItem('access_token');
        let rt = localStorage.getItem('refresh_token');
        if (typeof at !== 'undefined' && at !== null && rt !== 'undefined' && rt !== null) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
        localStorage.setItem('access_token', d.access_token);
        localStorage.setItem('refresh_token', d.refresh_token);
    }

    public get getAccessToken() {
        let check = localStorage.getItem('access_token');
        if (typeof check !== 'undefined' && check !== null) {
            return localStorage.getItem('access_token');
        } else {
            return localStorage.getItem('access_token');
        }
    }

    public get getRefreshToken() {
        let check = localStorage.getItem('refresh_token');
        if (typeof check !== 'undefined' && check !== null) {
            return localStorage.getItem('refresh_token');
        } else {
            return localStorage.getItem('refresh_token');
        }
    }

    public set setLogin(data: any) {
        let tmpdata = JSON.stringify(data);
        let check = localStorage.getItem('_user');
        if (typeof check !== 'undefined' && check !== null) {
            localStorage.removeItem('_user');
        }
        localStorage.setItem('_user', tmpdata);
    }

    public get getLogin() {
        let decryptData = "";
        let check = localStorage.getItem('_user');
        if (typeof check !== 'undefined' && check !== null) {
            decryptData = localStorage.getItem('_user');
            return JSON.parse(decryptData);
        } else {
            decryptData = localStorage.getItem('_user');
            return JSON.parse(decryptData);
        }
    }

    public set setRole(d: string) {
        let check = localStorage.getItem('_role');
        if (typeof check !== 'undefined' && check !== null) {
            localStorage.removeItem('_role');
        }
        localStorage.setItem('_role', d);
    }

    public get getRole() {
        let check = localStorage.getItem('_role');
        if (typeof check !== 'undefined' && check !== null) {
            return localStorage.getItem('_role');
        } else {
            return localStorage.getItem('_role');
        }
    }

    public set setCompanyCode(data: any) {
        let tmpdata = JSON.stringify(data);
        let check = localStorage.getItem('_company');
        if (typeof check !== 'undefined' && check !== null) {
            localStorage.removeItem('_company');
        }
        localStorage.setItem('_company', tmpdata);
    }

    public get getCompanyCode() {
        let decryptData = "";
        let check = localStorage.getItem('_company');
        if (typeof check !== 'undefined' && check !== null) {
            decryptData = localStorage.getItem('_company');
            return JSON.parse(decryptData);
        } else {
            decryptData = localStorage.getItem('_company');
            return JSON.parse(decryptData);
        }
    }

    public set setModule(data: any) {
        let tmpdata = JSON.stringify(data);
        let check = localStorage.getItem('_module');
        if (typeof check !== 'undefined' && check !== null) {
            localStorage.removeItem('_module');
        }
        localStorage.setItem('_module', tmpdata);
    }

    public get getModule() {
        let decryptData = "";
        let check = localStorage.getItem('_module');
        if (typeof check !== 'undefined' && check !== null) {
            decryptData = localStorage.getItem('_module');
            return JSON.parse(decryptData);
        } else {
            decryptData = localStorage.getItem('_module');
            return JSON.parse(decryptData);
        }
    }

    logout() {
        localStorage.clear();
        this._router.navigate(['login']);
    }
}