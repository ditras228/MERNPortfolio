import {Injectable} from "@angular/core";
import appConfig from "../config/appConfig";

@Injectable({providedIn: "root"})
export class UrlService{
  public formBgImgUrl(path: string | undefined): string{
    return `url(${appConfig.imgUrl}/${path})`
  }
  public formImgUrl(path: string | undefined): string{
    return `${appConfig.imgUrl}/${path}`
  }
}
