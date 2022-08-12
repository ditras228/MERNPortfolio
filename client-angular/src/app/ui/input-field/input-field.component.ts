import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  @Input() error: string | false | undefined;
  @Input() placeholder = '' as string;
  @Input() type = 'text' as string;
  @Output() valueChange = new EventEmitter<string>();

  @Input() internalValue = '';
  internalValueUpdate = new EventEmitter<string>();

  constructor(@Inject(PLATFORM_ID) private platformId) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.internalValueUpdate.subscribe(value => this.valueChange.emit(value));
    }
  }
}
