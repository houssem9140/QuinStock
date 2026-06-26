# QuinStock — Portail B2B Quincaillerie

Plateforme de vente en ligne et gestion de stock pour la quincaillerie professionnelle. Catalogue produits (Fixation, Plomberie, Outillage, Électricité, Peinture, Sécurité), panier, demandes de devis, dashboard admin et espace client B2B.

---

## Fonctionnalités

### Public
- Page d'accueil avec hero, statistiques, catégories mises en avant
- Catalogue complet avec filtres (catégorie, recherche, marque, prix, stock)
- Pages produits détaillées
- Panier d'achat
- Demande de devis personnalisée
- Page contact
- Multilingue (Français, English, العربية)
- Design responsive

### Espace Client
- Dashboard client avec récapitulatif
- Catalogue B2B avec prix
- Panier et validation de commande
- Historique des achats
- Suivi des devis (en attente, accepté, refusé)

### Administration
- Dashboard KPI (commandes, clients, stock, performance)
- Gestion des stocks (CRUD produits)
- Gestion des ventes
- Gestion des achats et approvisionnements
- Gestion des magasins/dépôts
- Validation des devis clients

---

## Stack Technique

| Couche     | Technologie                         |
| ---------- | ----------------------------------- |
| Frontend   | React 18, Tailwind CSS, ApexCharts  |
| Backend    | Node.js, Express                     |
| Base données | MongoDB, Mongoose                  |
| Auth       | JWT (JSON Web Token)                 |
| API        | REST                                |

### Dépendances principales

**Frontend :** `react-router-dom`, `@headlessui/react`, `@heroicons/react`, `apexcharts`, `react-apexcharts`, `chart.js`, `tailwindcss`

**Backend :** `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`, `multer`, `nodemon`

---

## Installation

### Prérequis
- Node.js 16+
- MongoDB (local ou Atlas)
- npm

### 1. Cloner le projet

```bash
git clone https://github.com/TON_COMPTE/React-Inventory-Management-System.git
cd React-Inventory-Management-System
```

### 2. Backend

```bash
cd Backend
cp .env.example .env
# Modifier .env avec vos identifiants
npm install
npm start        # ou: npm run serverStart (nodemon)
```

### 3. Frontend

```bash
cd Frontend
npm install
npm start
```

Le frontend tourne sur `http://localhost:3000` et l'API sur `http://localhost:4000`.

---

## Variables d'environnement (`Backend/.env`)

| Variable                    | Description                          |
| --------------------------- | ------------------------------------ |
| `PORT`                      | Port du serveur (défaut: 4000)       |
| `MONGO_URI`                 | URI de connexion MongoDB             |
| `JWT_SECRET`                | Clé secrète pour les tokens JWT      |
| `JWT_EXPIRES_IN`            | Durée de validité du token (ex: 7d)  |
| `ADMIN_REGISTRATION_CODE`   | Code secret pour créer un admin      |

---

## API Routes

### Auth
| Méthode | Endpoint             | Description              |
| ------- | -------------------- | ------------------------ |
| POST    | `/api/auth/register` | Inscription              |
| POST    | `/api/auth/login`    | Connexion                |
| GET     | `/api/auth/me`       | Profil utilisateur (JWT) |

### Produits
| Méthode | Endpoint                  | Description              |
| ------- | ------------------------- | ------------------------ |
| POST    | `/api/product/add`        | Ajouter un produit       |
| GET     | `/api/product/get/:userId`| Tous les produits        |
| POST    | `/api/product/update`     | Modifier un produit      |
| GET     | `/api/product/delete/:id` | Supprimer un produit     |
| GET     | `/api/product/search`     | Rechercher un produit    |

### Ventes
| Méthode | Endpoint                                            | Description          |
| ------- | --------------------------------------------------- | -------------------- |
| POST    | `/api/sales/add`                                    | Nouvelle vente       |
| GET     | `/api/sales/get/:userID`                            | Ventes par utilisateur |
| GET     | `/api/sales/getmonthly`                             | Ventes mensuelles    |
| GET     | `/api/sales/get/:userID/totalsaleamount`            | Total ventes         |

### Achats
| Méthode | Endpoint                                                  | Description          |
| ------- | --------------------------------------------------------- | -------------------- |
| POST    | `/api/purchase/add`                                       | Nouvel achat         |
| GET     | `/api/purchase/get/:userID`                               | Achats par utilisateur |
| GET     | `/api/purchase/get/:userID/totalpurchaseamount`           | Total achats         |

### Magasins
| Méthode | Endpoint                 | Description              |
| ------- | ------------------------ | ------------------------ |
| POST    | `/api/store/add`         | Ajouter un magasin       |
| GET     | `/api/store/get/:userID` | Magasins par utilisateur |

---

## Structure du projet

```
React-Inventory-Management-System/
├── Backend/
│   ├── controller/          # Logique métier (auth, product, sales, purchase, store)
│   ├── middleware/           # Middleware d'authentification JWT
│   ├── models/              # Schémas Mongoose
│   ├── router/              # Routes Express
│   ├── services/            # Services (authService)
│   ├── utils/               # Utilitaires
│   ├── .env.example         # Exemple de configuration
│   ├── package.json
│   └── server.js            # Point d'entrée
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/             # Appels API (authApi, client)
│   │   ├── assets/          # Images, icônes
│   │   ├── components/      # Composants réutilisables (Header, Layout, SideMenu, PublicTopbar)
│   │   ├── data/            # Données statiques (catalogue produits)
│   │   ├── pages/           # Pages (Home, Login, Register, Dashboard, ClientCatalogue, Cart, etc.)
│   │   ├── App.js           # Router principal
│   │   ├── AuthContext.js   # Contexte d'authentification
│   │   ├── CartContext.js   # Contexte du panier
│   │   └── LanguageContext.js # Contexte multilingue (FR/EN/AR)
│   ├── package.json
│   └── tailwind.config.js
│
├── ARCHITECTURE.md
└── README.md
```

---

## Fonctionnalités clés

### Catalogue
- 6 catégories principales : Fixation, Plomberie, Outillage, Électricité, Peinture, Sécurité
- Recherche en temps réel
- Filtres avancés (catégorie, marque, prix max, stock disponible)
- Tri alphabétique ou par prix
- Affichage en grille responsive

### Multilingue
- Français, Anglais, Arabe
- Support RTL pour l'arabe
- Traductions complètes (navigation, catalogue, dashboard)

### Panier et Devis
- Ajout/suppression de produits
- Gestion des quantités
- Génération de devis (PDF exportable)
- Statuts de devis : en attente, accepté, refusé

---

## Capture d'écran

*(Ajoute ici des captures d'écran de l'application)*

---

## Licence

Ce projet est sous licence MIT.
