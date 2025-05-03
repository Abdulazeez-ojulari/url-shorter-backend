import { Router } from "express";
const router = Router();

router.get('/', function(req, res, next) {
    res.send("Precise Store Backend")
    // res.render('index', { title: 'Precise Store Backend' });
});

export { router as appRouter };
