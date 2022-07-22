import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-info-skills',
  templateUrl: './info-skills.component.html',
  styleUrls: ['./info-skills.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class InfoSkillsComponent  {
  @Input() experience: String | undefined
  constructor() { }
}
