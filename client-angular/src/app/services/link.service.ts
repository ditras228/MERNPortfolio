import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class LinkService{
  constructor() {

  }
  github(): string{
    return 'https://t.me/Ditras'
  }
}
