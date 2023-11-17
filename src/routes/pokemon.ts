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
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  const id: number = Number(req.params.id)
  const pokemon: JsonObject = pokedex.find((poke) => poke.id === id) as JsonObject
  res.json(pokemon);
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req: Request, res: Response, next: NextFunction): void {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req: Request, res: Response, next: NextFunction): void {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req: Request, res: Response, next: NextFunction): void {
  // TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
  res.status(501).json({ message: "Not Implemented" });
  return;
});

export default router;
