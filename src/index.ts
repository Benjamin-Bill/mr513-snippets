import express, {NextFunction, Response, Request} from 'express';
import 'dotenv/config'
import session from 'express-session';
import snippetsRoutes from './snippets/snippets.routes';
import languagesRoutes from "./languages/languages.routes";
import authRoutes from "./auth/auth.routes";
import adminRoutes from "./admin/admin.routes";
import {isAdmin, isConnected, sessionUser} from "./auth/auth.middleware";

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.use(session({
    secret: process.env.SECRET || 'secret',
    saveUninitialized: false,
    resave: false
}));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));


app.use('/',sessionUser, snippetsRoutes);
app.use('/languages', sessionUser, languagesRoutes);
app.use('/auth', sessionUser, authRoutes);
app.use('/admin', sessionUser, isConnected, isAdmin, adminRoutes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
