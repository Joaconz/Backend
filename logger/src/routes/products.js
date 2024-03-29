import { Router } from "express";
import auth from "../middleware/auth.js";
import ProductController from "../controllers/product.js";
import authorization from "../middleware/authorization.js";

const router = Router();

const productController = new ProductController();

router.get("/", auth("session"), productController.getProducts);

router.get("/view", auth("session"), productController.getView);

router.get("/:pid", productController.getPID);

router.post("/", authorization("admin") ,productController.addProduct);

router.put("/:pid", authorization("admin"),productController.updateProduct);

router.delete("/:pid", authorization("admin"), productController.deleteProduct);

// router.post('/view', auth('session'), async (req, res)=> {
//     const { id } = req.body
//     if (id !== undefined) {
//         await cartManager.addProduct('640a9116397d14b30e55aa18', id)
//     }
// })

export default router;
