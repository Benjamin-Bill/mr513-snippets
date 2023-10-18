import {NextFunction, Request, Response} from "express";
import {prisma} from "../services/prima";
import bcrypt from "bcrypt";

export class AuthController {
  static async loginForm(req: Request, res: Response) {
    res.render('auth/login_form', {title: 'Connexion', section: 'Connexion' });
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const name: string = req.body.name;
    const user = await prisma.user.findFirst({
      where: {
        name: name
      }
    }).then((user) => {return user}).catch((err) => {return undefined});

    if (user === undefined || user === null) {
      throw new Error('Utilisateur inconnu');
    } else {
      const password: string = req.body.password;

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!passwordMatch) {
        throw new Error('Mot de passe incorrect');
      } else {
        req.session.regenerate(() => {
          req.session.user = user.name;
          res.redirect('/');
        })
      }
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.session.destroy(() => {
      res.redirect('/');
    })
  }
}
