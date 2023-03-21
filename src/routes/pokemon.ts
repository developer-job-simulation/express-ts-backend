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

/* GET Pokemon by Id. */
router.get(
  "/:id",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
    const id = Number(req.params.id);

    if (!id) {
      res.status(400).json({
        error: "Invalid ID",
      });
      return;
    }

    const findPokemon = pokedex.find((obj) => obj.id === id);

    if (!findPokemon) {
      res.status(404).json({
        error: "Not found",
      });
      return;
    }

    res.status(200).json(findPokemon);
    return;
  }
);

/* GET Pokemon by English Name */
router.get(
  "/name/:name",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

    const pokemonName = req.params.name;

    const findPokemon = pokedex.find((item) => {
      return Object.values(item.name).find((val) => {
        return val === pokemonName;
      });
    });

    if (!findPokemon) {
      res.status(404).json({
        error: "Not found",
      });
      return;
    }
    res.status(200).json(findPokemon);
    return;
  }
);

/* GET Pokemon by Type */
router.get(
  "/type/:type",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs

    const type = req.params.type as string;

    const findPokemon = pokedex.filter((val) => {
      return val.type.includes(type);
    });
    if (findPokemon.length === 0) {
      res.status(400).json({
        error: "Bad request",
      });
      return;
    }
    res.status(200).json(findPokemon);
    return;
  }
);

/* GET Pokemon by HP */
router.get(
  "/hp",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
    const lt = Number(req.query.lt);
    const gt = Number(req.query.gt);
    const lte = Number(req.query.lte);
    const gte = Number(req.query.gte);

    const validQueryStrings = ["gt", "gte", "lt", "lte"];
    const queryStringKey = Object.keys(req.query);
    const isValid = queryStringKey.every((val) =>
      validQueryStrings.includes(val)
    );
    let findPokemon;

    if (!isValid) {
      res.status(400).json({
        error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
      });
      return;
    }

    if (lt) {
      findPokemon = pokedex.filter((val) => {
        return val.base.HP < lt;
      });
    } else if (gt) {
      findPokemon = pokedex.filter((val) => {
        return val.base.HP > gt;
      });
    } else if (lte) {
      findPokemon = pokedex.filter((val) => {
        return val.base.HP <= lte;
      });
    } else if (gte) {
      findPokemon = pokedex.filter((val) => {
        return val.base.HP >= gte;
      });
    } else if (lte && gt) {
      findPokemon = pokedex.filter((val) => {
        return val.base.HP <= lte && val.base.HP > gt;
      });
    } else if (gte && lte) {
      findPokemon = pokedex.filter((val) => {
        return val.base.HP <= gte && val.base.HP >= lte;
      });
    }

    if (!findPokemon) {
      res.status(404).json({
        error: "Not found",
      });
      return;
    }

    res.status(200).json(findPokemon);
    return;
  }
);

export default router;
