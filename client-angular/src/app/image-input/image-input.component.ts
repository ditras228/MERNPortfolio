import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent {
  @Input() imgUrlValue = ''
  @Output() setFormImageUrl=new EventEmitter<string | ArrayBuffer | null>();
  public isDirty = false

  constructor() { }
  getFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.isDirty=true
      this.setFormImageUrl.emit(reader.result)

    }
    reader.readAsDataURL(file);
  }

}
