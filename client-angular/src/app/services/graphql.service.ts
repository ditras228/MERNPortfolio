import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import appConfig from '../config/appConfig';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(
    protected httpClient: HttpClient,
    protected cookieService: CookieService
  ) {}
  doRequest<T>(query: string, variables: any): Observable<T> {
    const token = this.cookieService.get('token');
    const locale = this.cookieService.get('locale');
    return this.httpClient
      .post<{ data: T }>(
        appConfig.baseUrl,
        { query, variables },
        { headers: { Authorization: token, Locale: locale } }
      )
      .pipe(map(response => response.data));
  }
}
