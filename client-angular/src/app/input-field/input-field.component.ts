import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() placeholder = '' as string
  @Output() valueChange = new EventEmitter<string>();

  @Input()  internalValue = ''
  internalValueUpdate = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.internalValueUpdate.subscribe(value=> this.valueChange.emit(value))
  }

}
