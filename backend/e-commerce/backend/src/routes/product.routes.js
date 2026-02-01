import { Router } from "express";
import { VerifyJWT } from "../middleware/auth.middleware.js"
import { productController } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(VerifyJWT)

router.post("/create", upload.array("image", 5), productController);

export default router;