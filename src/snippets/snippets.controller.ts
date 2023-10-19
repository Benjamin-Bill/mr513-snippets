import {Request, Response} from "express";
import {prisma} from "../services/prima";
import {validationResult} from "express-validator";

export class SnippetsController {
  static async list(req: Request, res: Response): Promise<void> {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const snippets = req.query.lang ? await prisma.snippet.findMany({
        include: {Language: true, User: {select: {id: true, name: true}}},
        where: {languageId: parseInt(<string>req.query.lang)}
      }).then((snippets) => {
        return snippets
      }) : await prisma.snippet.findMany({
        include: {
          Language: true,
          User: {select: {id: true, name: true}}
        }
      }).then((snippets) => {
        return snippets
      });
      const user = req.session.user;
      res.render('snippets/snippets_list', {snippets, title: 'Liste des snippets', section: 'Snippets', user});
    } else {
      throw new Error(result.array()[0].msg);
    }
  }

  static async newForm(req: Request, res: Response): Promise<void> {
    const user = req.session.user;
    const languages = await prisma.language.findMany();
    res.render('snippets/snippets_form', {languages, title: 'Nouveau snippet', section: 'Snippets', user});
  }

  static async newSnippet(req: Request, res: Response): Promise<void> {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const {title, code, description, languages} = req.body;
      const user = req.session.user;
      const languagePrisma = await prisma.language.findUnique({where: {id: parseInt(languages)}}).then((language) => {
        return language
      });

      const userPrisma = await prisma.user.findUnique({where: {id: parseInt(user.id)}}).then((user) => {
        return user
      });
      if (languagePrisma !== null && userPrisma !== null) {
        await prisma.snippet.create({
          data: {
            title: title,
            code: code.replace(/(\r\n)+$/g, '').replace(/(\r\n){2,}/g, '\r\n'),
            description: description.replace(/(\r\n)+$/g, '').replace(/(\r\n){2,}/g, '\r\n'),
            creationDate: new Date(),
            languageId: languagePrisma.id,
            userId: userPrisma.id
          }
        })
      }
      res.redirect('/');

    } else {
      throw new Error(result.array()[0].msg);
    }
  }

  static async editForm(req: Request, res: Response): Promise<void> {
    const user = req.session.user;
    const languages = await prisma.language.findMany();
    const snippet = await prisma.snippet.findUnique({where: {id: parseInt(req.params.id)}});
    console.log(snippet);
    res.render('snippets/snippets_form', {title: 'Modifier un snippet', section: 'Snippets', snippet, languages, user});
  }

  static async editSnippet(req: Request, res: Response): Promise<void> {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const {title, code, description, languages} = req.body;
      const user = req.session.user;
      const languagePrisma = await prisma.language.findUnique({where: {id: parseInt(languages)}}).then((language) => {
        return language
      });

      const userPrisma = await prisma.user.findUnique({where: {id: parseInt(user.id)}}).then((user) => {
        return user
      });

      if (languagePrisma !== null && userPrisma !== null) {
        const snippet = await prisma.snippet.update({
          where: {id: parseInt(req.params.id)},
          data: {
            title: title,
            code: code.replace(/(\r\n)+$/g, '').replace(/(\r\n){2,}/g, '\r\n'),
            description: description.replace(/(\r\n)+$/g, '').replace(/(\r\n){2,}/g, '\r\n'),
            languageId: languagePrisma.id,
            userId: userPrisma.id
          }
        })
      }
      res.redirect('/');
    }
  }

  static async deleteSnippet(req: Request, res: Response): Promise<void> {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const snippet = await prisma.snippet.delete({where: {id: parseInt(req.params.id)}});
      res.redirect('/');
    }
  }
}

