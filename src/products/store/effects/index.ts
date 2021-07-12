import { PizzasEffects } from "./pizzas.effects";
import { ToppingsEffect } from "./toppings.effects";

export const effects: any[] = [PizzasEffects, ToppingsEffect];

export * from "./pizzas.effects";
export * from "./toppings.effects";
