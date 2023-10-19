import { Request, Response, NextFunction } from 'express';
import {prisma} from "../services/prima";

export function sessionUser(req: Request, res: Response, next: NextFunction): void {
  res.locals.user = req.session.user;
  next();
}

export function isConnected(req: Request, res: Response, next: NextFunction): void {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/auth');
  }
}

export async function isAuthoreConnected(req: Request, res: Response, next: NextFunction): Promise<void> {
  const snippetId = parseInt(req.params.id);
  const snippet = await prisma.snippet.findUnique({where: {id: snippetId}}).then((snippet) => {
    return snippet
  });
  if (snippet !== null && snippet.userId === req.session.user.id) {
    next();
  } else {
    res.redirect('/');
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await prisma.user.findUnique({where: {id: req.session.user.id}}).then((user) => {
    return user
  });
  if (user !== null && user.role === 'ADMIN') {
    next();
  } else {
    res.redirect('/');
  }
}
