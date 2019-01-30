import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class DataService {
    private subject = new Subject<any>();

    setLogin(status: boolean) {
        this.subject.next({ isLogin: status });
    }

    getLogin(): Observable<any> {
        return this.subject.asObservable();
    }
}
