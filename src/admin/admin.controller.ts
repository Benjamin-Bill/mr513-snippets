import {Request, Response} from "express";
import {prisma} from "../services/prima";
import bcrypt from "bcrypt";

export class AdminController{
  static async index(req: Request, res: Response): Promise<void> {
    res.render('admin/index', {title: 'Administration', section: 'Administration', authUser: req.session.user})
  }

  static async usersList(req: Request, res: Response): Promise<void> {
    const users = await prisma.user.findMany();
    res.render('admin/users_list', {title: 'Liste des utilisateurs', section: 'Liste des utilisateurs', authUser: req.session.user, users})
  }

  static async newUserForm(req: Request, res: Response): Promise<void> {
    res.render('admin/user_form', {title: 'Nouvel utilisateur', section: 'Nouvel utilisateur', authUser: req.session.user, user: undefined})
  }

  static async newUser(req: Request, res: Response): Promise<void> {
    const {name, role, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    await prisma.user.create({data: {name, role, hashedPassword }});
    res.redirect('/admin/users');
  }

  static async editUserForm(req: Request, res: Response): Promise<void> {
    const user = await prisma.user.findUnique({where: {id: parseInt(req.params.id)}});
    res.render('admin/user_form', {title: 'Modifier un utilisateur', section: 'Modifier un utilisateur', authUser: req.session.user, user})
  }

  static async editUser(req: Request, res: Response): Promise<void> {
    const {name, role, password} = req.body;
    const newRole = req.body.role === undefined ? 'USER' : role;
    if (password === '' ) {
      await prisma.user.update({where: {id: parseInt(req.params.id)}, data: {name, role: newRole}})
    } else {
    const hashedPassword = bcrypt.hashSync(password, 10)
    await prisma.user.update({where: {id: parseInt(req.params.id)}, data: {name, role: newRole, hashedPassword }})
    }
    res.redirect('/admin/users');
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    await prisma.snippet.deleteMany({where: {userId: parseInt(req.params.id)}});
    await prisma.user.delete({where: {id: parseInt(req.params.id)}});
    res.redirect('/admin/users');
  }

  static async languagesList(req: Request, res: Response): Promise<void> {
    const languages = await prisma.language.findMany();
    res.render('admin/languages_list', {title: 'Liste des langages', section: 'Liste des langages', authUser: req.session.user, languages})
  }

  static async newLanguageForm(req: Request, res: Response): Promise<void> {
    res.render('admin/language_form', {title: 'Nouveau langage', section: 'Nouveau langage', authUser: req.session.user, language: undefined})
  }

  static async newLanguage(req: Request, res: Response): Promise<void> {
    const {name, htmlClass, logo} = req.body;
    await prisma.language.create({data: {name, htmlClass, logo}});
    res.redirect('/admin/languages');
  }

  static async editLanguageForm(req: Request, res: Response): Promise<void> {
    const language = await prisma.language.findUnique({where: {id: parseInt(req.params.id)}});
    res.render('admin/language_form', {title: 'Modifier un langage', section: 'Modifier un langage', authUser: req.session.user, language})
  }

  static async editLanguage(req: Request, res: Response): Promise<void> {
    const {name, htmlClass, logo} = req.body;
    await prisma.language.update({where: {id: parseInt(req.params.id)}, data: {name, htmlClass, logo}});
    res.redirect('/admin/languages');
  }

  static async deleteLanguage(req: Request, res: Response): Promise<void> {
    await prisma.snippet.deleteMany({where: {languageId: parseInt(req.params.id)}});
    await prisma.language.delete({where: {id: parseInt(req.params.id)}});
    res.redirect('/admin/languages');
  }
}
