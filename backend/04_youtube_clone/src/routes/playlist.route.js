import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addVideosToPlaylist, createPlaylist, deletePlaylist, getPlaylistById, getUserPlaylists, removeFromPlaylist, updatePlaylist } from "../controllers/playlist.controllers.js";


const router = Router();

router.use(verifyJWT);

router.post("/", createPlaylist);

router.patch("/add/:videoId/:playlistId", addVideosToPlaylist);
router.patch("/remove/:videoId/:playlistId", removeFromPlaylist);
router.patch("/:playlistId", updatePlaylist);

router.get("/:playlistId", getPlaylistById);
router.get("/user/:userId", getUserPlaylists);

router.delete("/:playlistId", deletePlaylist);

export default router;