import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isHandset$: Observable<boolean>;
  public loaded = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private api: ApiService,
  ) {}
  ngOnInit(): void  {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));

    this.api.getAgencies$().subscribe();
    this.api.getMissionTypes().subscribe();
    this.api.getStatusTypes$().subscribe();
  }
}
