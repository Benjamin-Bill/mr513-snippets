import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {AdminController} from "./admin.controller";
import {isConnected} from "../auth/auth.middleware";
const router = express.Router();

router.get('/',isConnected, expressAsyncHandler(AdminController.index));
router.get('/users',isConnected, expressAsyncHandler(AdminController.usersList));
router.get('/users/new',isConnected, expressAsyncHandler(AdminController.newForm));
router.get('/users/edit/:id',isConnected, expressAsyncHandler(AdminController.editForm));
router.get('/users/delete/:id',isConnected, expressAsyncHandler(AdminController.deleteUser));

router.post('/users/new',isConnected, expressAsyncHandler(AdminController.newUser));
router.post('/users/edit/:id',isConnected, expressAsyncHandler(AdminController.editUser));

export default router;
