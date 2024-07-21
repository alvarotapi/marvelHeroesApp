import {
  HttpParams,
  type HttpErrorResponse,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';
import { environment } from '../../../environments/environment.development';

interface CredentialsParams {
  ts: string;
  apikey: string;
  hash: string;
}

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const timeStamp = Date.now().toString();
  const credentialsParams: CredentialsParams = {
    ts: timeStamp,
    apikey: environment.publicKey,
    hash: Md5.hashStr(
      timeStamp + environment.privateKey + environment.publicKey
    ),
  };

  let params = new HttpParams({ fromString: req.params.toString() });

  for (const key in credentialsParams) {
    if (credentialsParams.hasOwnProperty(key)) {
      params = params.set(
        key,
        credentialsParams[key as keyof CredentialsParams]
      );
    }
  }
  const modifiedReq = req.clone({ params });

  return next(modifiedReq).pipe(catchError(handleError));
};

const handleError = (error: HttpErrorResponse) => {
  console.warn(error);
  return throwError(() => new Error('Error en la petición'));
};
