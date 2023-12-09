import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
