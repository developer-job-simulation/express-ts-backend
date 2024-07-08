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
    try {
      const { id } = req.params;
      if (!id) {
        throw { message: "Id not found" };
      }
      const pokemonId = Number(id);
      const pokemon = pokedex.find((pokemon) => pokemon.id === pokemonId);

      if (pokemon) {
        res.status(200).json(pokemon);
      } else {
        res.status(404).json({ message: "Pokemon not found" });
      }
    } catch (error) {
      res.status(501).json({ message: "Not Implemented" });
    }
  }
);

/* GET Pokemon by English Name */
router.get(
  "/name/:name",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
    try {
      const { name } = req.params;
      if (!name) {
        throw res.status(400).json({ message: "not found" });
      }
      const pokingName = name;
      const pokeName = pokedex.find(
        (poke) => poke.name.english.toLowerCase() === pokingName.toLowerCase()
      );
      if (pokeName) {
        res.status(200).json(pokeName);
      } else {
        res.status(404).json({ message: "Pokename not found" });
      }
    } catch (error) {
      res.status(501).json({ message: "Not Implemented" });
    }
  }
);

/* GET Pokemon by Type */
router.get(
  "/type/:type",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
    try {
      const { type } = req.params;
      if (!type) {
        throw res.status(404).json({ message: "No type inputted" });
      }
      const foundType = pokedex.find(
        (found) => found.type.toString().toLowerCase() === type.toLowerCase()
      );
      if (foundType) {
        res.status(200).json(foundType);
      } else {
        res.status(404).json({ message: "Type not found" });
      }
    } catch (error) {
      res.status(501).json({ message: "Not Implemented" });
    }
  }
);

/* GET Pokemon by HP */
router.get(
  "/hp/:hp",
  function (req: Request, res: Response, next: NextFunction): void {
    // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
    try {
      const { hp } = req.params;
      if (!hp) {
        res.status(404).json({ message: "Input hp" });
      }
      const pokemonHp = Number(hp);
      const givenHp = pokedex.find((givenHp) => givenHp.base.HP === pokemonHp);
      if (givenHp) {
        res.status(200).json(givenHp);
      } else {
        res.status(404).json({ message: "Type not found" });
      }
    } catch (error) {
      res.status(501).json({ message: "Not Implemented" });
    }
  }
);

export default router;
