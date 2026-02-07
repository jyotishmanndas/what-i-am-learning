import { Router } from "express";
import { VerifyJWT } from "../middleware/auth.middleware.js";
import { addToCartController, decrementCartController, getCartController, incrementCartController, removeFromCartController } from "../controllers/cart.controllers.js";

const router = Router();

router.use(VerifyJWT)

router.post("/add/:productId", addToCartController);
router.post("/increment/:productId", incrementCartController);
router.post("/decrement/:productId", decrementCartController);
router.post("/remove/:productId", removeFromCartController);

router.get("/getcart", getCartController);

export default router;