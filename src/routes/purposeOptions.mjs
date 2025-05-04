/** this file congtains all the routes retaled to purpose-options */
import { Router } from "express";
import { getPurposeOptions } from "../controllers/purposeOptions.mjs";

// initialize router
const router = Router();

// route to get all the purpose options
router.get("/", getPurposeOptions);

export default router;
