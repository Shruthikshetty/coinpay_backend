/** this file congtains all the routes retaled to purpose-options */
import { Router } from "express";
import {
  addPurposeOption,
  getPurposeOptions,
  deletePurposeOption,
} from "../controllers/purposeOptions.mjs";

// initialize router
const router = Router();

// route to get all the purpose options
router.get("/", getPurposeOptions);
// route to add a new purpose option
router.post("/", addPurposeOption);
// route to delete a purpose option by id
router.delete("/:id", deletePurposeOption);

export default router;
