import { NextFunction, Request, Response, Router } from "express";
import pokedex from "../db/pokedex.json";
import { JsonObject } from "swagger-ui-express";

const router = Router();

/* GET All Pokemon */
router.get("/", function (req: Request, res: Response, next: NextFunction): void {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req: Request, res: Response, next: NextFunction): void {
  if (Object.values(req.query).length === 0) {
    const id: number = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const pokemon: JsonObject = pokedex.find((poke) => poke.id === id) as JsonObject;
    if (!pokemon) {
      res.status(404).json({ error: "Not found" });
    } else {
      res.json(pokemon);
    }
  } else {
    next();
  }
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req: Request, res: Response, next: NextFunction): void {
  const name: string = String(req.params.name);
  const pokemon: JsonObject = pokedex.find(
    (poke) => poke.name.english.toLowerCase() === name.toLowerCase()
  ) as JsonObject;
  if (!pokemon) {
    res.status(404).json({ error: "Not found" });
  } else {
    res.json(pokemon);
  }
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req: Request, res: Response, next: NextFunction): void {
  let type: string = String(req.params.type);
  const capitalize = (s: string) => s && s[0]?.toUpperCase() + s.slice(1);
  type = capitalize(type);
  const pokemon: JsonObject[] = pokedex.filter(
    (poke) => poke.type.includes(type) === true
  ) as JsonObject[];
  if (!pokemon.length) {
    res.status(400).json({ error: "Bad reqeust" });
  } else {
    res.json(pokemon);
  }
});

/* GET Pokemon by HP */
router.get("/hp", function (req: Request, res: Response, next: NextFunction): void {
  let pokemon: JsonObject[] = [];
  if (Number(req.query.lt) < Number(req.query.gt)) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (req.query.gt) {
    pokemon = pokedex.filter((poke) => poke.base.HP > Number(req.query.gt)) as JsonObject[];
  } else if (req.query.gte) {
    pokemon = pokedex.filter((poke) => poke.base.HP >= Number(req.query.gte)) as JsonObject[];
  } else if (req.query.lt) {
    pokemon = pokedex.filter((poke) => poke.base.HP < Number(req.query.lt)) as JsonObject[];
  } else if (req.query.lte) {
    pokemon = pokedex.filter((poke) => poke.base.HP <= Number(req.query.lte)) as JsonObject[];
  } else {
    res.status(400).json({ error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]' });
    return;
  }
  res.json(pokemon);
});

export default router;
