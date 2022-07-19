import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss']
})
export class InfoProfileComponent implements OnInit {
  @Input() info
  constructor() { }

  ngOnInit(): void {
  }

}
