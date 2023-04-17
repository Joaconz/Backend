import { Router } from "express";
import auth from "../middleware/auth.js";
import ProductController from "../controllers/product.js";

const router = Router();

const productController = new ProductController();

router.get("/", auth("session"), productController.getProducts);

router.get("/view", auth("session"), productController.getView);

router.get("/:pid", productController.getPID);

router.post("/", productController.addProduct);

router.put("/:pid", productController.updateProduct);

router.delete("/:pid", productController.deleteProduct);

// router.post('/view', auth('session'), async (req, res)=> {
//     const { id } = req.body
//     if (id !== undefined) {
//         await cartManager.addProduct('640a9116397d14b30e55aa18', id)
//     }
// })

export default router;
