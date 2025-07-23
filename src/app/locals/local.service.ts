import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Local } from './local.model';
import { map, catchError, of, retry } from 'rxjs';
import { isValidLocal } from './local.utils';
import { FirestoreLocal } from './local.firestore.model';
import { isFirestoreLocal } from './local.firestore.utils';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private firestore = inject(Firestore);

  getLocals(): Observable<Local[]> {
    const localsRef = collection(this.firestore, 'locals');

    return collectionData(localsRef, { idField: 'id' }).pipe(
      retry(2),
      map((items: DocumentData[]) =>
        items
          .filter(isFirestoreLocal)
      ),

      map((items: FirestoreLocal[]) => {
        const validItems = items.filter(isValidLocal);
        const invalidCount = items.length - validItems.length;

        if (invalidCount > 0) {
          console.warn(`${invalidCount} documento(s) descartados por datos incompletos.`);
        }
         return validItems.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
      }),
      catchError((error) => {
        console.error('Error al obtener los locales desde Firestore:', error);
        return of([]);
      })
    );
  }
}