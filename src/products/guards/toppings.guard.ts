import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap, catchError } from "rxjs/operators";

import * as fromStore from "../store";

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private _store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.getToppingsLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this._store.dispatch(new fromStore.LoadToppings());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
