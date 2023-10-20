import express from 'express';
import expressAsyncHandler from "express-async-handler";
import {AdminController} from "./admin.controller";
import {isConnected} from "../auth/auth.middleware";
const router = express.Router();

router.get('/',isConnected, expressAsyncHandler(AdminController.index));

// Users
router.get('/users', expressAsyncHandler(AdminController.usersList));
router.get('/users/new', expressAsyncHandler(AdminController.newUserForm));
router.get('/users/edit/:id', expressAsyncHandler(AdminController.editUserForm));
router.get('/users/delete/:id', expressAsyncHandler(AdminController.deleteUser));

router.post('/users/new', expressAsyncHandler(AdminController.newUser));
router.post('/users/edit/:id', expressAsyncHandler(AdminController.editUser));

// Languages
router.get('/languages', expressAsyncHandler(AdminController.languagesList));
router.get('/languages/new', expressAsyncHandler(AdminController.newLanguageForm));
router.get('/languages/edit/:id', expressAsyncHandler(AdminController.editLanguageForm));
router.get('/languages/delete/:id', expressAsyncHandler(AdminController.deleteLanguage));

router.post('/languages/new', expressAsyncHandler(AdminController.newLanguage));
router.post('/languages/edit/:id', expressAsyncHandler(AdminController.editLanguage));
export default router;
