import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import appConfig from '../config/appConfig';

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(protected httpClient: HttpClient) {}

  doRequest<T>(query: string, variables: any): Observable<T> {
    return this.httpClient
      .post<{ data: T }>(appConfig.baseUrl, { query, variables })
      .pipe(map(response => response.data));
  }
}
