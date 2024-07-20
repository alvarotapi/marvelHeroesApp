import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment.development';
import { MarvelApiResponse } from '../interfaces/marvel-api.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl: string = environment.baseUrl;
  private publicKey: string = environment.publicKey;
  private privateKey: string = environment.privateKey;

  constructor(private http: HttpClient) {}

  getPaginatedCharacters(
    limit: number,
    offset: number
  ): Observable<MarvelApiResponse> {
    const ts = Date.now().toString();

    let httpParams = new HttpParams({
      fromObject: {
        limit,
        offset,
        ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });

    return this.http.get<MarvelApiResponse>(`${this.baseUrl}characters`, {
      params: httpParams,
    });
  }

  getCharacterById(characterId: string): Observable<MarvelApiResponse> {
    const ts = Date.now().toString();

    let httpParams = new HttpParams({
      fromObject: {
        ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });

    return this.http.get<MarvelApiResponse>(
      `${this.baseUrl}characters/${characterId}`,
      {
        params: httpParams,
      }
    );
  }

  getCharactersByNameStartsWith(
    nameStartsWith: string
  ): Observable<MarvelApiResponse> {
    const ts = Date.now().toString();

    let httpParams = new HttpParams({
      fromObject: {
        nameStartsWith,
        ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });

    return this.http.get<MarvelApiResponse>(`${this.baseUrl}characters`, {
      params: httpParams,
    });
  }
}
