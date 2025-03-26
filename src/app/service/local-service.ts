import { Injectable } from '@angular/core';

/**
 * Useful service to store and retrive data from local storage
 */
@Injectable({
    providedIn: 'root'
})
export class LocalService {

    constructor() { }

    public saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public getData(key: string) {
        return localStorage.getItem(key)
    }
    public removeData(key: string) {
        localStorage.removeItem(key);
    }

    public clearData() {
        localStorage.clear();
    }

    public isEmpty(key: string) {
        const data = localStorage.getItem(key);
        if (data) {
            return data.trim() === "";
        }
        return true;
    }
}