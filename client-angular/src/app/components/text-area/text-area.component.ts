import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  @Input() error: string | undefined
  @Input() placeholder = '' as string
  @Input() rows = 1 as number
  @Output() valueChange = new EventEmitter<string>();

  @Input() internalValue = ''
  internalValueUpdate = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit(): void {
    this.internalValueUpdate.subscribe(value => this.valueChange.emit(value))
  }
}
