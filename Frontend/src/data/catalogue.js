export const categories = [
  {
    id: "fixation",
    name: "Fixation",
    description: "Visserie, boulonnerie, chevilles et rondelles.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bolts%2CNuts_%26_Washers.jpg/1280px-Bolts%2CNuts_%26_Washers.jpg",
    imageAlt: "Assortiment de boulons, ecrous et rondelles pour fixation professionnelle",
    seoTitle: "Fixation professionnelle, visserie, boulonnerie et rondelles",
  },
  {
    id: "plomberie",
    name: "Plomberie",
    description: "Raccords, vannes, flexibles et accessoires sanitaires.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Kitchen_renovation_replacing_valve_beneath_sink_with_two_compression_fitting_pipes_detached.JPG",
    imageAlt: "Raccords, vannes et tuyauterie pour plomberie professionnelle",
    seoTitle: "Plomberie professionnelle, raccords, vannes et flexibles",
  },
  {
    id: "outillage",
    name: "Outillage",
    description: "Outils manuels et consommables atelier.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Old_tools_on_personal_workshop_wall.jpg",
    imageAlt: "Outils manuels suspendus dans un atelier professionnel",
    seoTitle: "Outillage professionnel et consommables d'atelier",
  },
  {
    id: "electricite",
    name: "Electricite",
    description: "Gaines, dominos, boitiers et accessoires cable.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Power_line_electrical_underground_junction_box_with_armoured_cable_connectors_Haringey.jpg/1280px-Power_line_electrical_underground_junction_box_with_armoured_cable_connectors_Haringey.jpg",
    imageAlt: "Connecteurs et cables electriques pour installations professionnelles",
    seoTitle: "Materiel electrique professionnel, cables, connecteurs et boitiers",
  },
  {
    id: "peinture",
    name: "Peinture",
    description: "Rouleaux, bacs, rubans et preparation surface.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Paint-roller000000.jpg",
    imageAlt: "Rouleau de peinture professionnel pour preparation de surface",
    seoTitle: "Peinture professionnelle, rouleaux, bacs et rubans de masquage",
  },
  {
    id: "securite",
    name: "Securite",
    description: "Gants, lunettes, cadenas et equipements chantier.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Occupational_Safety_Equipment.jpg",
    imageAlt: "Equipements de securite chantier avec protection professionnelle",
    seoTitle: "Equipements de securite chantier, gants, lunettes et protections",
  },
];

export const products = [
  { id: "vis-bois-50", categoryId: "fixation", name: "Vis bois tete fraisee 5x50", brand: "ProFix", price: 18.9, unit: "Boite 200 pcs", stock: 84 },
  { id: "cheville-nylon-8", categoryId: "fixation", name: "Cheville nylon universelle 8 mm", brand: "BuildMate", price: 11.5, unit: "Sachet 100 pcs", stock: 120 },
  { id: "boulon-m8", categoryId: "fixation", name: "Boulon hexagonal M8 zingue", brand: "MetalPro", price: 24.2, unit: "Boite 100 pcs", stock: 45 },
  { id: "vanne-laiton", categoryId: "plomberie", name: "Vanne laiton quart de tour", brand: "AquaLine", price: 16.8, unit: "Piece", stock: 38 },
  { id: "raccord-cuivre", categoryId: "plomberie", name: "Raccord cuivre femelle 15/21", brand: "AquaLine", price: 5.9, unit: "Piece", stock: 210 },
  { id: "flexible-inox", categoryId: "plomberie", name: "Flexible inox sanitaire 50 cm", brand: "Saniflex", price: 8.4, unit: "Piece", stock: 67 },
  { id: "cle-molette", categoryId: "outillage", name: "Cle a molette 250 mm", brand: "ForgePro", price: 19.7, unit: "Piece", stock: 26 },
  { id: "tournevis-set", categoryId: "outillage", name: "Jeu tournevis isoles", brand: "ForgePro", price: 32.5, unit: "Set 6 pcs", stock: 31 },
  { id: "forets-metal", categoryId: "outillage", name: "Coffret forets metal HSS", brand: "DrillMax", price: 28.9, unit: "Coffret 19 pcs", stock: 19 },
  { id: "gaine-icta", categoryId: "electricite", name: "Gaine ICTA 20 mm", brand: "ElecPro", price: 21.4, unit: "Couronne 25 m", stock: 52 },
  { id: "domino-16", categoryId: "electricite", name: "Barrette domino 16 mm", brand: "ElecPro", price: 3.2, unit: "Piece", stock: 140 },
  { id: "boite-derivation", categoryId: "electricite", name: "Boite de derivation etanche", brand: "Voltix", price: 7.8, unit: "Piece", stock: 73 },
  { id: "rouleau-peinture", categoryId: "peinture", name: "Rouleau peinture facade", brand: "ColorPro", price: 6.5, unit: "Piece", stock: 95 },
  { id: "ruban-masquage", categoryId: "peinture", name: "Ruban masquage 48 mm", brand: "ColorPro", price: 4.6, unit: "Rouleau", stock: 160 },
  { id: "bac-peinture", categoryId: "peinture", name: "Bac peinture professionnel", brand: "PaintLine", price: 9.9, unit: "Piece", stock: 42 },
  { id: "gants-nitrile", categoryId: "securite", name: "Gants nitrile chantier", brand: "SafePro", price: 12.3, unit: "Boite 50 paires", stock: 58 },
  { id: "lunettes-protection", categoryId: "securite", name: "Lunettes protection anti-rayure", brand: "SafePro", price: 7.2, unit: "Piece", stock: 88 },
  { id: "cadenas-laiton", categoryId: "securite", name: "Cadenas laiton 40 mm", brand: "LockMaster", price: 10.8, unit: "Piece", stock: 33 },
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
