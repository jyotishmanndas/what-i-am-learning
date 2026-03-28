import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import productControllers from "../controllers/product.controllers.js";

const router = Router();

router.post("/create", verifyJWT, productControllers.createProduct);
router.get("/getAllProducts", productControllers.getAllProducts);
router.get("/:productId", productControllers.getProductById);
router.patch("/update/:productId", verifyJWT, productControllers.updateProduct);
router.get("/delete/:productId", verifyJWT, productControllers.deleteProduct);


export default router