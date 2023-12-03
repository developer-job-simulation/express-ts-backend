import { Router } from "express";
import pokedex from "../db/pokedex.json";

const router = Router();

/* GET All Pokemon */
router.get("/", function (_req, res) {
  return res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  if (id === "hp") return next();
  if (isNaN(Number(id))) return res.status(400).json({ error: "Invalid ID" });
  const pokemon = pokedex[Number(id) - 1];
  if (!pokemon) return res.status(404).json({ error: "Not found" });
  return res.json(pokemon);
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res) {
  const name = req.params.name.toLowerCase();
  const pokemon = pokedex.find((p) => name === p.name.english.toLowerCase());
  if (!pokemon) return res.status(404).json({ error: "Not found" });
  return res.json(pokemon);
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res) {
  const types = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];
  let type = req.params.type;
  type = (type[0] || "").toUpperCase() + type.slice(1).toLowerCase();
  if (!types.includes(type)) {
    return res.status(400).json({ error: "Bad request" });
  }
  return res.json(pokedex.filter((pokemon) => pokemon.type.includes(type)));
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res) {
  const { lt, gt, lte, gte } = req.query;
  const values = {
    lt: isNaN(Number(lt)) ? null : Number(lt),
    gt: isNaN(Number(gt)) ? null : Number(gt),
    lte: isNaN(Number(lte)) ? null : Number(lte),
    gte: isNaN(Number(gte)) ? null : Number(gte),
  };
  if (Object.values(values).every((v) => v === null)) {
    return res.status(400).json({
      error: 'Invalid Operator. Must be one of ["gt","gte","lt","lte"]',
    });
  }
  const pokemons = pokedex.filter((p) => {
    const hp = p.base.HP;
    const { lt, gt, lte, gte } = values;
    return (
      (lt === null || hp < lt) &&
      (gt === null || hp > gt) &&
      (lte === null || hp <= lte) &&
      (gte === null || hp >= gte)
    );
  });
  if (!pokemons) return res.status(404).json({ error: "Not found" });
  return res.json(pokemons);
});

export default router;
