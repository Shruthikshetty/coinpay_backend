/** this file groups all the routes together */

import { Router } from "express";
import purposeOptionsRoute from "./purposeOptions.mjs";

// initialize a router
const router = Router();

// All the routes go here
router.use("/api/purpose-options", purposeOptionsRoute);

export default router;
