import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment.development';
import {
  CharacterApiResponse,
  ComicApiResponse,
} from '../interfaces/marvel-api.interface';
import { Observable } from 'rxjs';

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
  ): Observable<CharacterApiResponse> {
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

    return this.http.get<CharacterApiResponse>(`${this.baseUrl}characters`, {
      params: httpParams,
    });
  }

  getCharacterById(characterId: string): Observable<CharacterApiResponse> {
    const ts = Date.now().toString();

    let httpParams = new HttpParams({
      fromObject: {
        ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });

    return this.http.get<CharacterApiResponse>(
      `${this.baseUrl}characters/${characterId}`,
      {
        params: httpParams,
      }
    );
  }

  getCharactersByNameStartsWith(
    nameStartsWith: string
  ): Observable<CharacterApiResponse> {
    const ts = Date.now().toString();

    let httpParams = new HttpParams({
      fromObject: {
        nameStartsWith,
        ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });

    return this.http.get<CharacterApiResponse>(`${this.baseUrl}characters`, {
      params: httpParams,
    });
  }

  getComicById(comicId: string): Observable<ComicApiResponse> {
    const ts = Date.now().toString();

    let httpParams = new HttpParams({
      fromObject: {
        ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });

    return this.http.get<ComicApiResponse>(`${this.baseUrl}comics/${comicId}`, {
      params: httpParams,
    });
  }
}
