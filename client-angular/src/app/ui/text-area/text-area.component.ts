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
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() error: string | undefined;
  @Input() placeholder = '' as string;
  @Input() rows = 1 as number;
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
