import {Request, Response} from "express";
import {prisma} from "../services/prima";
import bcrypt from "bcrypt";

export class AuthController {
    static async loginForm(req: Request, res: Response) {
        res.render('auth/login_form', {title: 'Connexion', section: 'Connexion', authUser: req.session.user});
    }

    static async login(req: Request, res: Response): Promise<void> {
        const name: string = req.body.name;
        const user = await prisma.user.findFirst({
            where: {
                name: name
            }
        }).then((user) => {
            return user
        }).catch(() => {
            return undefined
        });

        if (user === undefined || user === null) {
            throw new Error('Utilisateur inconnu');
        } else {
            const password: string = req.body.password;

            const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

            if (!passwordMatch) {
                throw new Error('Mot de passe incorrect');
            } else {
                req.session.regenerate(() => {
                    req.session.user = user;
                    res.redirect('/');
                })
            }
        }
    }

    static logout(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
}
