import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {GetWork} from "../../../generated/graphql";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkComponent implements OnInit {
  @Input() work: GetWork | undefined

  constructor() { }

  ngOnInit(): void {
  }
  public isPortfolio(url: any):boolean{
    console.log(window.location)
    return window.location.origin==url
  }
  public openLink(url: any): void{
    window.open(url)
  }
}
