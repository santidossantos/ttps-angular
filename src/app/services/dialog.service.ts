import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/*

  Servicio para la comunicacion entre
  los componentes de dialogo y el componente
  que los llama

*/

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private closeDialogSubject = new Subject<void>();

  closeDialog$ = this.closeDialogSubject.asObservable();

  constructor() {}

  triggerCloseDialog() {
    this.closeDialogSubject.next();
  }
}
