import { NextFunction, Request, Response, Router } from "express";
import pokedex from "../db/pokedex.json";

const router = Router();

/* GET All Pokemon */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
	return res.status(200).json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req: Request, res: Response, next: NextFunction) {
	if (!(typeof req.params.id === "number")) {
		return res.status(400).json({ error: "Invalid ID" });
	}

	const result = pokedex.find((pokemon) => {
		return String(pokemon.id) === req.params.id;
	});

	if (!result) {
		return res.status(404).json({ error: "Not found" });
	}

	return res.status(200).json(result);
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req: Request, res: Response, next: NextFunction) {
	const result = pokedex.find((pokemon) => {
		return pokemon.name.english.toLowerCase() === req.params.name;
	});

	if (!result) {
		return res.status(404).json({ message: `No Pokemon found with name: ${req.params.name}` });
	}

	return res.status(200).json(result);
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req: Request, res: Response, next: NextFunction) {
	const result = pokedex.filter((pokemon) => {
		if (req.params.type) {
			return pokemon.type
							.map((type) => type.toLowerCase())
							.includes(req.params.type);
		} else {
			return false;
		}
	});

	if (!result) {
		return res.status(404).json({ message: `No Pokemon found with type: ${req.params.type}` });
	}

	return res.status(200).json(result);
});

/* GET Pokemon by HP */
router.get("/hp", function (req: Request, res: Response, next: NextFunction): void {
	// TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
	res.status(501).json({ message: "Not Implemented" });
	return;
});

export default router;
