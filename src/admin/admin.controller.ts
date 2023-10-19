import {Request, Response} from "express";
import {prisma} from "../services/prima";
import bcrypt from "bcrypt";

export class AdminController{
  static async index(req: Request, res: Response): Promise<void> {

  }

  static async usersList(req: Request, res: Response): Promise<void> {
    const users = await prisma.user.findMany();
    res.render('admin/users_list', {title: 'Liste des utilisateurs', section: 'Liste des utilisateurs', users})
  }

  static async newForm(req: Request, res: Response): Promise<void> {
    res.render('admin/user_form', {title: 'Nouvel utilisateur', section: 'Nouvel utilisateur', user: undefined})
  }

  static async newUser(req: Request, res: Response): Promise<void> {
    const {name, role, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    await prisma.user.create({data: {name, role, hashedPassword }});
    res.redirect('/admin/users');
  }

  static async editUser(req: Request, res: Response): Promise<void> {
    const user = await prisma.user.findUnique({where: {id: parseInt(req.params.id)}});
    res.render('admin/user_form', {title: 'Modifier un utilisateur', section: 'Modifier un utilisateur', user})
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    await prisma.snippet.deleteMany({where: {userId: parseInt(req.params.id)}});
    await prisma.user.delete({where: {id: parseInt(req.params.id)}});
    res.redirect('/admin/users');
  }
}
