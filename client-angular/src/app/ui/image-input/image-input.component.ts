import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent {
  @Input() imgUrlValue = '';
  @Output() setFormImageUrl = new EventEmitter<string | ArrayBuffer | null>();
  public isDirty = false;

  constructor(public urlService: UrlService) {}
  getFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.isDirty = true;
      this.setFormImageUrl.emit(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
