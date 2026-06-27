const publicUrl = process.env.PUBLIC_URL || "";
const categoryImage = (fileName) => `${publicUrl}/categories/${fileName}`;
const productImage = (fileName) => `${publicUrl}/products/${fileName}`;

export const categories = [
  {
    id: "fixation",
    name: "Fixation",
    description: "Visserie, boulonnerie, chevilles et rondelles.",
    imageUrl: categoryImage("fixation.jpg"),
    imageAlt: "Assortiment de boulons, ecrous et rondelles pour fixation professionnelle",
    seoTitle: "Fixation professionnelle, visserie, boulonnerie et rondelles",
  },
  {
    id: "plomberie",
    name: "Plomberie",
    description: "Raccords, vannes, flexibles et accessoires sanitaires.",
    imageUrl: categoryImage("plomberie.jpg"),
    imageAlt: "Raccords, vannes et tuyauterie pour plomberie professionnelle",
    seoTitle: "Plomberie professionnelle, raccords, vannes et flexibles",
  },
  {
    id: "outillage",
    name: "Outillage",
    description: "Outils manuels et consommables atelier.",
    imageUrl: categoryImage("outillage.jpg"),
    imageAlt: "Outils manuels suspendus dans un atelier professionnel",
    seoTitle: "Outillage professionnel et consommables d'atelier",
  },
  {
    id: "electricite",
    name: "Electricite",
    description: "Gaines, dominos, boitiers et accessoires cable.",
    imageUrl: categoryImage("electricite.jpg"),
    imageAlt: "Connecteurs et cables electriques pour installations professionnelles",
    seoTitle: "Materiel electrique professionnel, cables, connecteurs et boitiers",
  },
  {
    id: "peinture",
    name: "Peinture",
    description: "Rouleaux, bacs, rubans et preparation surface.",
    imageUrl: categoryImage("peinture.jpg"),
    imageAlt: "Rouleau de peinture professionnel pour preparation de surface",
    seoTitle: "Peinture professionnelle, rouleaux, bacs et rubans de masquage",
  },
  {
    id: "securite",
    name: "Securite",
    description: "Gants, lunettes, cadenas et equipements chantier.",
    imageUrl: categoryImage("securite.jpg"),
    imageAlt: "Equipements de securite chantier avec protection professionnelle",
    seoTitle: "Equipements de securite chantier, gants, lunettes et protections",
  },
];

export const products = [
  { id: "vis-bois-50", categoryId: "fixation", name: "Vis bois tete fraisee 5x50", brand: "ProFix", price: 18.9, unit: "Boite 200 pcs", stock: 84, imageUrl: productImage("vis-bois-50.webp") },
  { id: "cheville-nylon-8", categoryId: "fixation", name: "Cheville nylon universelle 8 mm", brand: "BuildMate", price: 11.5, unit: "Sachet 100 pcs", stock: 120, imageUrl: productImage("cheville-nylon-8.webp") },
  { id: "boulon-m8", categoryId: "fixation", name: "Boulon hexagonal M8 zingue", brand: "MetalPro", price: 24.2, unit: "Boite 100 pcs", stock: 45, imageUrl: productImage("boulon-m8.webp") },
  { id: "vanne-laiton", categoryId: "plomberie", name: "Vanne laiton quart de tour", brand: "AquaLine", price: 16.8, unit: "Piece", stock: 38, imageUrl: productImage("vanne-laiton.webp") },
  { id: "raccord-cuivre", categoryId: "plomberie", name: "Raccord cuivre femelle 15/21", brand: "AquaLine", price: 5.9, unit: "Piece", stock: 210, imageUrl: productImage("raccord-cuivre.webp") },
  { id: "flexible-inox", categoryId: "plomberie", name: "Flexible inox sanitaire 50 cm", brand: "Saniflex", price: 8.4, unit: "Piece", stock: 67, imageUrl: productImage("flexible-inox.webp") },
  { id: "cle-molette", categoryId: "outillage", name: "Cle a molette 250 mm", brand: "ForgePro", price: 19.7, unit: "Piece", stock: 26, imageUrl: productImage("cle-molette.webp") },
  { id: "tournevis-set", categoryId: "outillage", name: "Jeu tournevis isoles", brand: "ForgePro", price: 32.5, unit: "Set 6 pcs", stock: 31, imageUrl: productImage("tournevis-set.webp") },
  { id: "forets-metal", categoryId: "outillage", name: "Coffret forets metal HSS", brand: "DrillMax", price: 28.9, unit: "Coffret 19 pcs", stock: 19, imageUrl: productImage("forets-metal.webp") },
  { id: "gaine-icta", categoryId: "electricite", name: "Gaine ICTA 20 mm", brand: "ElecPro", price: 21.4, unit: "Couronne 25 m", stock: 52, imageUrl: productImage("gaine-icta.webp") },
  { id: "domino-16", categoryId: "electricite", name: "Barrette domino 16 mm", brand: "ElecPro", price: 3.2, unit: "Piece", stock: 140, imageUrl: productImage("domino-16.webp") },
  { id: "boite-derivation", categoryId: "electricite", name: "Boite de derivation etanche", brand: "Voltix", price: 7.8, unit: "Piece", stock: 73, imageUrl: productImage("boite-derivation.webp") },
  { id: "rouleau-peinture", categoryId: "peinture", name: "Rouleau peinture facade", brand: "ColorPro", price: 6.5, unit: "Piece", stock: 95, imageUrl: productImage("rouleau-peinture.webp") },
  { id: "ruban-masquage", categoryId: "peinture", name: "Ruban masquage 48 mm", brand: "ColorPro", price: 4.6, unit: "Rouleau", stock: 160, imageUrl: productImage("ruban-masquage.webp") },
  { id: "bac-peinture", categoryId: "peinture", name: "Bac peinture professionnel", brand: "PaintLine", price: 9.9, unit: "Piece", stock: 42, imageUrl: productImage("bac-peinture.webp") },
  { id: "gants-nitrile", categoryId: "securite", name: "Gants nitrile chantier", brand: "SafePro", price: 12.3, unit: "Boite 50 paires", stock: 58, imageUrl: productImage("gants-nitrile.webp") },
  { id: "lunettes-protection", categoryId: "securite", name: "Lunettes protection anti-rayure", brand: "SafePro", price: 7.2, unit: "Piece", stock: 88, imageUrl: productImage("lunettes-protection.webp") },
  { id: "cadenas-laiton", categoryId: "securite", name: "Cadenas laiton 40 mm", brand: "LockMaster", price: 10.8, unit: "Piece", stock: 33, imageUrl: productImage("cadenas-laiton.webp") },
];

export function getCategoryById(categoryId) {
  return categories.find((category) => category.id === categoryId);
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") {
    return products;
  }

  return products.filter((product) => product.categoryId === categoryId);
}
