import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment.development';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private baseUrl: string = environment.baseUrl;
  private publicKey: string = environment.publicKey;
  private privateKey: string = environment.privateKey;

  constructor(private http: HttpClient) {}

  getHeroes() {
    const ts = Date.now().toString();

    return this.http.get<Response>(`${this.baseUrl}/characters`, {
      params: {
        ts: ts,
        apikey: this.publicKey,
        hash: Md5.hashStr(ts + this.privateKey + this.publicKey),
      },
    });
  }
}
