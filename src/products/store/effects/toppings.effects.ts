import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as toppingsAction from "../actions/toppings.actions";
import * as fromServices from "../../services";

@Injectable()
export class ToppingsEffect {
  constructor(
    private _actions$: Actions,
    private _toppingService: fromServices.ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this._actions$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() =>
      this._toppingService.getToppings().pipe(
        map((toppings) => new toppingsAction.LoadToppingsSuccess(toppings)),
        catchError((error) => of(new toppingsAction.LoadToppingsFail(error)))
      )
    )
  );
}
