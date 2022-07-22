import {Component, Input} from '@angular/core';
import {UrlService} from "../../services/url.service";

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss']
})
export class InfoProfileComponent {
  @Input() info
  constructor(public urlService: UrlService) { }

}
