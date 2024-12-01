# Application

## Installation
### Front-End (Vue.js)

#### Prérequis
- Node.js installé

### Lancer l'application front-end
1. Naviguez dans le dossier `front-end` :
    cd front-end
2. Installez les dépendances :
   npm install
3. Démarrez l'application :
   npm run dev
   
### Back-End (Node.js, Express.js, TypeScript)
#### Prérequis
- Node.js et TypeScript installés

### Lancer l'application back-end
1. Naviguez dans le dossier `back-end` :
   cd back-end
2. Installez les dépendances :
   npm install
3. Démarrez le serveur back-end :
   npm start
* Le serveur back-end sera disponible à l'adresse http://localhost:5000 ou une autre selon la configuration.

# Documentation de l'API
1. Endpoint : GET /trending_products
* Description : Récupère les produits tendance en fonction des ventes.
* Paramètres : Aucun.
* Exemple de réponse :
  `[
  {
    "productID": 4,
    "productName": "Headphones",
    "category": "Electronics",
    "price": 35.74,
    "sales": 4966
  },
  {
    "productID": 100,
    "productName": "Kayak",
    "category": "Sports & Outdoors",
    "price": 270.01,
    "sales": 5005
  }
] `
2. Endpoint : GET /products
* Description : Récupère la liste complète des produits avec les informations sur les ventes.
* Paramètres : Aucun.
* Exemple de réponse :
`[
  {
    "totalSales": 4966,
    "Products": {
      "_id": "674743310fcac5422d96b553",
      "ProductID": 4,
      "ProductName": "Headphones",
      "Category": "Electronics",
      "Price": 35.74,
      "DateAdded": "2024-11-27T16:05:05.795Z",
      "__v": 0
    }
  },
  {
    "totalSales": 5005,
    "Products": {
      "_id": "674743310fcac5422d96b5b3",
      "ProductID": 100,
      "ProductName": "Kayak",
      "Category": "Sports & Outdoors",
      "Price": 270.01,
      "DateAdded": "2024-11-27T16:05:05.835Z",
      "__v": 0
    }
  }
 ... ]`
3. Endpoint : GET /category_sales
* Description : Récupère les ventes totales par catégorie de produit, avec leur pourcentage par rapport au total des ventes.
* Paramètres : Aucun.
* Exemple de réponse :
` [
  {
    "category": "Home & Kitchen",
    "totalSales": 2807251330.4,
    "percentage": 20.06
  },
  {
    "category": "Sports & Outdoors",
    "totalSales": 2781652106.6,
    "percentage": 19.88
  },
  {
    "category": "Clothing",
    "totalSales": 2776888094.4,
    "percentage": 19.85
  },
  {
    "category": "Books",
    "totalSales": 2814002893.6,
    "percentage": 20.11
  },
  {
    "category": "Electronics",
    "totalSales": 2809211728.4,
    "percentage": 20.08
  }
] `
4. Endpoint : GET /total_sales/:days
  * Description : Récupère le total des ventes pour les derniers X jours.
  * Paramètres :
    days : Le nombre de jours pour lequel récupérer les ventes totales (ex. 7, 30).
  * Exemple de réponse :
  `[
  {
    "totalSales": 8777176120.4
  }
]`











