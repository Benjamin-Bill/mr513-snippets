# Application Web avec base de données

## Auteur
- Lucas Vasseur

## Installation / Configuration

Assurez-vous d'installer les dépendances requises en exécutant la commande suivante :

```bash
npm install
```

Créez un fichier `.env` à la racine du projet et ajoutez-y les variables d'environnement suivantes :

- `PORT` : Le port sur lequel votre application écoutera les demandes.
- `SECRET` : La clé secrète utilisée pour la gestion des sessions.
- `DATABASE_URL` : L'URL de connexion à votre base de données principale.
- `SHADOW_DATABASE_URL` : L'URL de connexion à votre base de données temporaire (utilisée pour les migrations).

Exemple du contenu de votre fichier `.env` :


```env
PORT=3000
SECRET=SecretKey
DATABASE_URL="mysql://USER:PASSWORD@mysql:3306/user_snippets"
SHADOW_DATABASE_URL="mysql://USER:PASSWORD@mysql:3306/user_snippets_shadow"
```

Le projet est préconfiguré avec les éléments suivants :
- [TypeScript](https://www.typescriptlang.org/): TypeScript est un langage open source qui compile en JavaScript. Il offre la possibilité de travailler avec des types pour un développement plus robuste.

- [ESLint](https://eslint.org/): ESLint est un outil de linting pour JavaScript/TypeScript qui vous aide à maintenir un code propre et cohérent.

- [Express](https://expressjs.com/): Express est un framework web pour Node.js qui facilite la création d'applications web robustes.

- [Prisma](https://www.prisma.io/): Prisma est un outil d'accès aux bases de données qui simplifie l'interaction avec votre base de données en utilisant TypeScript.

## Base de données

Ce projet utilise [Prisma](https://www.prisma.io/) pour l'accès à la base de données. Prisma est un ORM (Object-Relational Mapping) qui simplifie l'interaction avec votre base de données en utilisant TypeScript.

### Migrations

Cette commande générera un nouveau fichier de migration dans le répertoire `prisma/migrations`. Vous pouvez ensuite appliquer cette migration à votre base de données en exécutant la commande suivante :

```bash
npx prisma migrate dev --name [nom de la migration]
```

### Migrate Reset

Cette commande effectue les actions suivantes :

- Supprime la base de données ou le schéma existant, si possible, ou effectue une réinitialisation en douceur si l'environnement ne permet pas la suppression de bases de données ou de schémas.
- Crée une nouvelle base de données ou schéma portant le même nom si la base de données ou le schéma a été supprimé(e).
- Applique toutes les migrations précédemment définies.
- Exécute des scripts de graines pour peupler la base de données avec des données initiales, le cas échéant.

```bash
npx prisma migrate reset
```

## Scripts NPM

Ce script utilise `tsc-watch` pour surveiller les fichiers TypeScript et les recompiler automatiquement en cas de succès. Il démarre également le script `start` une fois la compilation terminée.
```bash
npm run watch
```
###
Ce script utilise `eslint` pour effectuer une vérification statique du code source situé dans le répertoire "src".
```bash
npm run lint
```
###
Ce script est similaire à `lint`, mais il tente également de corriger automatiquement certaines erreurs de linting lorsque cela est possible.
```bash
npm run lint:fix
```
###
Ce script démarre l'application en exécutant le fichier JavaScript compilé situé dans le répertoire "dist".
```bash
npm run start
```
### 
Ce script compile les fichiers TypeScript du frontend en utilisant le projet `tsconfig.frontend.json`.
```bash
npm run front
```
###
Ce script démarre l'application en utilisant `nodemon`, ce qui permet un développement en temps réel. Il surveille les changements dans le code source et redémarre automatiquement l'application lorsque des modifications sont détectées.
```bash
npm run dev
```