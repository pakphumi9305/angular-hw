import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }
  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(user: any,storageKey:string): void {
    sessionStorage.removeItem(storageKey);
    sessionStorage.setItem(storageKey, JSON.stringify(user));
  }

  public getUser(storageKey : string): any {
    const user = sessionStorage.getItem(storageKey);
    return user ? JSON.parse(user) : null;
  }

  public isLoggedIn(storageKey:string): boolean {
    return sessionStorage.getItem(storageKey) !== null;
  }
}
