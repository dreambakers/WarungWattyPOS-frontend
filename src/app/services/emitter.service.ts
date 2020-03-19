import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  @Output() emittter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  emit(event) {
    this.emittter.emit(event);
  }

}
