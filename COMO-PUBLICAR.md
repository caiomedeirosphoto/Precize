# Como publicar o Precize

Siga o guia em PDF que veio junto (guia-precize-do-zero.pdf). Resumo:

1. No app antigo, baixe o backup: Meu perfil > Ajustes do app > Baixar backup.
2. Firebase: crie o projeto, ligue o login por e-mail e senha, crie o Firestore, cole as regras do arquivo firestore.rules e registre o app da Web.
3. Mande o bloco firebaseConfig para o Claude e troque o firebase-config.js pelo arquivo que ele devolver.
4. GitHub: crie o repositório precize, suba todos os arquivos desta pasta (inclusive a pasta icons) e ligue o GitHub Pages em Settings > Pages.
5. No Firebase, autorize o endereço SEU-USUARIO.github.io em Authentication > Configurações > Domínios autorizados.
6. Abra https://SEU-USUARIO.github.io/precize/, crie a conta, restaure o backup e instale no iPhone.
7. Só depois de conferir tudo, apague o projeto antigo no Firebase e o repositório antigo no GitHub.
