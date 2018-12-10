import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public statuses: any[];
  public agencies: any[];
  public missionTypes: any[];

  constructor(private http: HttpClient) { }

  public getAgencies$ = (): Observable<any[]> => {
    if (this.agencies) {
      return of(this.agencies);
    }
    return this.http
      .get('/assets/data/agencies.json')
      .pipe(
        map( (res: any) => res.agencies),
        tap(res => (this.agencies = res)),
        tap( res =>
          localStorage.setItem('agencies', JSON.stringify( this.agencies))
        )
      );
  }

  public getMissionTypes = (): Observable<any[]> => {
    if (this.missionTypes) {
      return of(this.agencies);
    }
    return this.http
      .get('/assets/data/missiontypes.json')
      .pipe(
        map( (res: any) => res.types),
        tap(res => (this.missionTypes = res)),
        tap( res =>
          localStorage.setItem('missionTypes', JSON.stringify( this.missionTypes))
        )
      );
  }

  public getStatusTypes$ = (): Observable<any[]> =>
    this.http.get('/assets/data/launchstatus.json').pipe(
      map((res: any) => res.types),
      tap((res: any[]) => (this.statuses = res)),
      tap(next =>
        localStorage.setItem('statuses', JSON.stringify(this.statuses))
      )
    )
}
