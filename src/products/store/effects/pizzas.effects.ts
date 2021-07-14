import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as pizzaActions from "../actions/pizzas.action";
import * as fromServices from "../../services";

import * as fromRoot from "../../../app/store";

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

  @Effect()
  createPizza$ = this._actions$.ofType(pizzaActions.CREATE_PIZZA).pipe(
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((pizza) =>
      this._pizzaService.createPizza(pizza).pipe(
        map((pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.CreatePizzaFail(error)))
      )
    )
  );

  @Effect()
  createPizzaSuccess$ = this._actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map((pizza) => new fromRoot.Go({ path: ["products", pizza.id] }))
    );

  @Effect()
  updatePizza$ = this._actions$.ofType(pizzaActions.UPDATE_PIZZA).pipe(
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza) =>
      this._pizzaService.updatePizza(pizza).pipe(
        map((pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.UpdatePizzaFail(error)))
      )
    )
  );

  @Effect()
  removePizza$ = this._actions$.ofType(pizzaActions.REMOVE_PIZZA).pipe(
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap((pizza) =>
      this._pizzaService.removePizza(pizza).pipe(
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        catchError((error) => of(new pizzaActions.RemovePizzaFail(error)))
      )
    )
  );

  @Effect()
  handlePizzaSuccess$ = this._actions$
    .ofType(
      pizzaActions.REMOVE_PIZZA_SUCCESS,
      pizzaActions.UPDATE_PIZZA_SUCCESS
    )
    .pipe(map(() => new fromRoot.Go({ path: ["products"] })));
}
