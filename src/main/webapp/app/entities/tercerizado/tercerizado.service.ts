import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITercerizado } from 'app/shared/model/tercerizado.model';

type EntityResponseType = HttpResponse<ITercerizado>;
type EntityArrayResponseType = HttpResponse<ITercerizado[]>;

@Injectable({ providedIn: 'root' })
export class TercerizadoService {
  public resourceUrl = SERVER_API_URL + 'api/tercerizados';

  constructor(protected http: HttpClient) {}

  create(tercerizado: ITercerizado): Observable<EntityResponseType> {
    return this.http.post<ITercerizado>(this.resourceUrl, tercerizado, { observe: 'response' });
  }

  update(tercerizado: ITercerizado): Observable<EntityResponseType> {
    return this.http.put<ITercerizado>(this.resourceUrl, tercerizado, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITercerizado>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITercerizado[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
