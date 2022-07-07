import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-info-skills',
  templateUrl: './info-skills.component.html',
  styleUrls: ['./info-skills.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class InfoSkillsComponent implements OnInit {
  @Input() experience: String | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
