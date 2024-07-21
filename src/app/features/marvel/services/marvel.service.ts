import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CharacterApiResponse,
  ComicApiResponse,
} from '../interfaces/marvel-api.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPaginatedCharacters(
    limit: number,
    offset: number
  ): Observable<CharacterApiResponse> {
    let httpParams = new HttpParams({
      fromObject: {
        limit,
        offset,
      },
    });

    return this.http.get<CharacterApiResponse>(`${this.baseUrl}characters`, {
      params: httpParams,
    });
  }

  getCharacterById(characterId: string): Observable<CharacterApiResponse> {
    return this.http.get<CharacterApiResponse>(
      `${this.baseUrl}characters/${characterId}`
    );
  }

  getCharactersByNameStartsWith(
    nameStartsWith: string
  ): Observable<CharacterApiResponse> {
    let httpParams = new HttpParams({
      fromObject: {
        nameStartsWith,
      },
    });

    return this.http.get<CharacterApiResponse>(`${this.baseUrl}characters`, {
      params: httpParams,
    });
  }

  getComicById(comicId: string): Observable<ComicApiResponse> {
    return this.http.get<ComicApiResponse>(`${this.baseUrl}comics/${comicId}`);
  }
}
