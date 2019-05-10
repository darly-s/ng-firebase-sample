import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor() {}

    public getData<T>(key: string): T {
        var localValue = localStorage.getItem(key);
        return JSON.parse(localValue) as T;
    };

    public setData<T>(key: string, data: T): void {
        let newString = JSON.stringify(data);
        localStorage.setItem(key, newString);
    };
}