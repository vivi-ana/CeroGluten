import { inject, Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Local } from './local.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  getLocals(): Observable<Local[]> {
    const localsRef = collection(this.firestore, 'locals');

    let result!: Observable<Local[]>;

    runInInjectionContext(this.injector, () => {
      result = collectionData(localsRef, { idField: 'id' }) as Observable<Local[]>;
    });

    return result;
  }
}