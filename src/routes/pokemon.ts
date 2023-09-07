import { NextFunction, Request, Response, Router } from "express";
import pokedex from "../db/pokedex.json";

const router = Router();

/* GET All Pokemon */
router.get(
  "/",
  function (req: Request, res: Response, next: NextFunction): void {
    res.json(pokedex);
  }
);

/* GET Pokemon by HP */
router.get(
  "/hp",
  function (req: Request, res: Response, next: NextFunction): void {
    const validOperators = ["gt", "gte", "lt", "lte"];

    // filter only valid operators
    const operators = validOperators.filter(
      (op) => req.query[op] !== undefined
    );

    if (operators.length === 0) {
      res.status(400).json({
        error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
      });
      return;
    }

    const hpValues: Record<string, number> = {};

    // for every valid operator, find hp
    for (const operator of operators) {
      const hp = parseInt(req.query[operator] as string);
      if (isNaN(hp)) {
        res.status(400).json({ error: "Invalid HP value" });
        return;
      }
      hpValues[operator] = hp;
    }

    // asign the operator to each key
    const comparisons: Record<string, (a: number, b: number) => boolean> = {
      gt: (a, b) => a > b,
      gte: (a, b) => a >= b,
      lt: (a, b) => a < b,
      lte: (a, b) => a <= b,
    };

    // filter pokemons, for every operator, with the respective hpValue
    const pokemons = pokedex.filter((pokemon) => {
      return operators.every((operator) => {
        const comparison = comparisons[operator];
        if (comparison)
          return comparison(pokemon.base.HP, hpValues[operator] as number);
        return false;
      });
    });

    if (pokemons.length > 0) {
      res.json(pokemons);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  }
);

/* GET Pokemon by Id. */
router.get(
  "/:id",
  function (req: Request, res: Response, next: NextFunction): void {
    const id = req.params.id;

    if (!id || !Number.isInteger(parseInt(id))) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const pokemon = pokedex.find((pokemon) => pokemon.id === parseInt(id));

    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: "Not found" });
    }
    return;
  }
);

/* GET Pokemon by English Name */
router.get(
  "/name/:name",
  function (req: Request, res: Response, next: NextFunction): void {
    const name = req.params.name;

    if (!name) {
      res.status(400).json({ error: "Name parameter is missing" });
      return;
    }

    const pokemon = pokedex.find(
      (pokemon) => pokemon.name.english.toLowerCase() === name.toLowerCase()
    );

    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ error: "Not found" });
    }
    return;
  }
);

/* GET Pokemon by Type */
router.get(
  "/type/:type",
  function (req: Request, res: Response, next: NextFunction): void {
    const type = req.params.type;

    if (!type) {
      res.status(404).json({ error: "Type parameter is missing" });
      return;
    }

    const pokemon = pokedex.filter((pokemon) =>
      pokemon.type.some(
        (typeName) => typeName.toLowerCase() === type.toLowerCase()
      )
    );

    if (pokemon.length > 0) {
      res.json(pokemon);
    } else {
      res.status(400).json({ error: "Bad request" });
    }
    return;
  }
);

export default router;
