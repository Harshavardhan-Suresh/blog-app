import express from "express";
import { follow, getAllUser, getUser, login, signup, unfollow } from "../controllers/user-controller";
const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/follow/:id1/:id2", follow);
router.post("/unfollow/:id1/:id2", unfollow);
export default router;
