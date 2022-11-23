import { NextFunction, Request, Response, Router } from "express";

const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction): void {
  res.render("index", { title: "Express" });
});

export default router;
