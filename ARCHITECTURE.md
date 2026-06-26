# Architecture Portail Commandes B2B

Ce projet doit rester simple, clair et performant. Chaque module suit une architecture en couches pour eviter la logique melangee dans les routes ou les composants React.

## Backend

Structure cible :

```text
Backend/
  controller/       # HTTP: req/res, status codes, messages
  middleware/       # auth, roles, validation transversale
  models/           # schemas MongoDB / Mongoose
  router/           # declaration des routes Express
  services/         # logique metier
  utils/            # helpers purs: JWT, formatage, serialisation
  server.js         # bootstrap Express
```

Regles :

- Une route ne contient pas de logique metier.
- Un controller ne parle qu'en HTTP.
- Un service contient les regles metier et appelle les models.
- Un model ne connait ni Express ni React.
- Les erreurs metier portent un `statusCode`.
- Les donnees sensibles ne sortent jamais du backend, par exemple `password`.

## Frontend

Structure cible :

```text
Frontend/src/
  api/              # appels API centralises
  components/       # composants reutilisables
  pages/            # pages routees
  AuthContext.js    # session utilisateur
  App.js            # routing principal
```

Routing cible :

```text
/                 # page publique avec navbar Login / Signup
/login            # connexion
/register         # inscription client pro
/client           # espace client pro
/client/catalogue # catalogue client
/client/devis     # devis client
/admin            # dashboard administrateur
/admin/*          # stock, commandes, devis, clients
```

Regles :

- Les composants ne doivent pas contenir d'URL API hardcodee.
- Les appels HTTP passent par `src/api`.
- Le token JWT est lu par le client API et ajoute en `Authorization`.
- Les pages restent responsables de l'etat UI: chargement, erreur, formulaire.
- Les composants reutilisables ne connaissent pas les details backend.
- Apres login, un `admin` va vers `/admin` et un `client` va vers `/client`.
- Une route admin ne doit jamais etre accessible a un client.

## Modules Prevus

1. Authentification et roles
2. Catalogue produits B2B avec filtres
3. Panier et demande de devis
4. Generation PDF du devis
5. Dashboard admin commandes, stock, clients
6. Notifications email
7. Design final et optimisation UX

## Performance

- Filtrer et paginer cote backend pour les listes produits, commandes et clients.
- Ajouter des index MongoDB sur les champs recherches: `email`, `category`, `brand`, `name`.
- Eviter les gros documents imbriques; preferer les references propres pour commandes/devis.
- Retourner seulement les champs utiles a l'ecran courant.
- Centraliser les appels API pour gerer cache, token et erreurs plus facilement.

## Securite

- Mot de passe hashe avec bcrypt.
- Authentification par JWT.
- Routes admin protegees par role.
- Creation admin controlee par code serveur `ADMIN_REGISTRATION_CODE`.
- Secrets via variables d'environnement, jamais en dur dans le code.
