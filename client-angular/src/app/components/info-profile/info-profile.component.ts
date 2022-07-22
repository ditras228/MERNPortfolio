import { Component, Input } from '@angular/core';
import { UrlService } from '../../services/url.service';
import { GetInfo } from '../../../generated/graphql';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss'],
})
export class InfoProfileComponent {
  @Input() info: GetInfo | undefined;

  constructor(public urlService: UrlService) {}

  formBgImgUrlHandler(url: string | undefined): string {
    return this.urlService.formBgImgUrl(url);
  }
}
