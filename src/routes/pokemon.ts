import { NextFunction, Request, Response, Router } from "express";
import pokedex from "../db/pokedex.json";

const router = Router();

/* GET All Pokemon */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
	return res.status(200).json(pokedex);
});

/* GET Pokemon by HP */
router.get("/hp", function (req: Request, res: Response, next: NextFunction) {
	// TODO: Implement this route. See swagger docs for details, by visiting http://localhost:3000/api-docs
	let result = [];
	
	if (req.query.gt) {
		result = pokedex.filter((pokemon) => {
			// @ts-ignore
			return pokemon.base.HP > req.query.gt;
		});
	} else if (req.query.lt) {
		result = pokedex.filter((pokemon) => {
			// @ts-ignore
			return pokemon.base.HP < req.query.lt;
		});
	} else if (req.query.gte) {
		result = pokedex.filter((pokemon) => {
			// @ts-ignore
			return pokemon.base.HP >= req.query.gte;
		});
	} else if (req.query.lte) {
		result = pokedex.filter((pokemon) => {
			// @ts-ignore
			return pokemon.base.HP <= req.query.lte;
		});
	} else {
		return res.status(400).json({
			error: "Invalid Operator. Must be one of [\"gt\",\"gte\",\"lt\",\"lte\"]" 
		});
	}

	if (result.length === 0) {
		return res.status(404).json({ error: "Not found" });
	}

	return res.status(200).json(result);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req: Request, res: Response, next: NextFunction) {
	if (Number.isNaN(Number(req.params.id))) {
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
		return res.status(404).json({ error: "Not found" });
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

	if (result.length === 0) {
		return res.status(400).json({ error: "Bad request" });
	}

	return res.status(200).json(result);
});

export default router;
