import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as pizzaActions from "../actions/pizzas.action";
import * as fromServices from "../../services";

@Injectable()
export class PizzasEffects {
  constructor(
    private _actions$: Actions,
    private _pizzaService: fromServices.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this._actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() =>
      this._pizzaService.getPizzas().pipe(
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
      )
    )
  );
}
