import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'vass0047',
            hashedPassword: bcrypt.hashSync('azerty', 10),
            role: 'ADMIN'
        }
    });

    await prisma.user.create({
        data: {
            name: 'bob',
            hashedPassword: bcrypt.hashSync('qsdfgh', 10),
        }
    });

    await prisma.language.create({
        data: {
            name: 'C',
            htmlClass: 'language-c',
            logo: 'devicon-c-plain'
        }
    });

    await prisma.language.create({
        data: {
            name: 'HTML',
            htmlClass: 'language-html',
            logo: 'devicon-html5-plain'
        }
    })

    await prisma.snippet.create({
        data: {
            title: 'Hello World',
            code:
                `main()
{
    printf("hello, world\\n");
}`,
            description: 'Code original publié dans "The C Programming Language" de Brian Kernighan et Dennis Ritchie.',
            creationDate: new Date(2023, 4, 8, 9, 12, 36),
            languageId: 1,
            userId: 2
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Il faut protéger ses chaînes de caractères',
            code: '<script>window.alert("Injection !")</script>',
            creationDate: new Date(2023, 3, 4, 5, 6, 7),
            description: 'Dans le template EJS, observez le comportement de la page en utilisant successivement les balises <%- et <%=pour injecter les données.',
            languageId: 2,
            userId: 1
        }
    });

    await prisma.snippet.create({
        data: {
            title: 'Lien de téléchargement',
            code: ' <a href="url" download> ',
            creationDate: new Date(2023, 3, 9, 6, 16, 42),
            description: 'Téléchargez le fichier en cliquant sur le lien (au lieu de naviguer vers le fichier)',
            languageId: 2,
            userId: 1
        }
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
