import { Router } from "express";
import { VerifyJWT } from "../middleware/auth.middleware.js"
import { deleteProduct, getAllProducts, getProductById, getUserProducts, productController, updateProductController } from "../controllers/product.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.use(VerifyJWT)

router.post("/create", upload.array("image", 5), productController);
router.get("/allproducts", getAllProducts);
router.get("/user", getUserProducts);

router.get("/:productId", getProductById);

router.patch("/update/:productId", updateProductController);

router.delete("/delete/:productId", deleteProduct);

export default router;