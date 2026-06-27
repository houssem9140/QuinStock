const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "Frontend", "public", "products");
const cataloguePath = path.join(rootDir, "Frontend", "src", "data", "catalogue.js");
const fallbackImage = path.join(rootDir, "Frontend", "public", "hardware-hero.jpg");

const products = [
  { id: "vis-bois-50", query: "wood screw countersunk" },
  { id: "cheville-nylon-8", query: "nylon wall plug anchor" },
  { id: "boulon-m8", query: "hex bolt m8" },
  { id: "vanne-laiton", query: "brass ball valve" },
  { id: "raccord-cuivre", query: "copper pipe fitting" },
  { id: "flexible-inox", query: "braided stainless steel hose" },
  { id: "cle-molette", query: "adjustable wrench" },
  { id: "tournevis-set", query: "insulated screwdriver set" },
  { id: "forets-metal", query: "metal drill bit set" },
  { id: "gaine-icta", query: "electrical conduit coil" },
  { id: "domino-16", query: "electrical terminal block" },
  { id: "boite-derivation", query: "electrical junction box" },
  { id: "rouleau-peinture", query: "paint roller" },
  { id: "ruban-masquage", query: "masking tape roll" },
  { id: "bac-peinture", query: "paint tray" },
  { id: "gants-nitrile", query: "nitrile work gloves" },
  { id: "lunettes-protection", query: "safety goggles" },
  { id: "cadenas-laiton", query: "brass padlock" },
];

const manualImageUrls = {
  "vis-bois-50": "https://upload.wikimedia.org/wikipedia/commons/8/85/Black_wood_screw_with_flat_Phillips_head.jpg",
  "cheville-nylon-8": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Tasselli_wall_plug.jpg",
  "boulon-m8": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Sechskantschrauben_--_2020_--_3985-8.jpg",
  "vanne-laiton": "https://upload.wikimedia.org/wikipedia/commons/d/da/Brass-Ball-Valve_MF_Butterfly_12592-360x480_%284999932531%29.jpg",
  "raccord-cuivre": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Kupferfittings_4062.jpg",
  "flexible-inox": "https://commons.wikimedia.org/wiki/Special:FilePath/Flexible%20hose.jpg",
  "cle-molette": "https://upload.wikimedia.org/wikipedia/commons/7/73/Adjustable_spanner_20101109.jpg",
  "tournevis-set": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Screwdriver-Set-222523-480x360_%284904404681%29.jpg",
  "forets-metal": "https://upload.wikimedia.org/wikipedia/commons/1/1a/2010-01-21_Craftsman_Professional_cobalt_drill_bit_set.jpg",
  "gaine-icta": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Electrical_conduit.JPG",
  "domino-16": "https://upload.wikimedia.org/wikipedia/commons/a/ac/PhoenixConnector.jpg",
  "boite-derivation": "https://commons.wikimedia.org/wiki/Special:FilePath/Electrical%20junction%20box.jpg",
  "rouleau-peinture": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Farbroller.jpg",
  "ruban-masquage": "https://commons.wikimedia.org/wiki/Special:FilePath/Masking%20tape.jpg",
  "bac-peinture": "https://commons.wikimedia.org/wiki/Special:FilePath/Paint%20tray.jpg",
  "gants-nitrile": "https://commons.wikimedia.org/wiki/Special:FilePath/Nitrile%20gloves.jpg",
  "lunettes-protection": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Safety_Goggles.jpg",
  "cadenas-laiton": "https://upload.wikimedia.org/wikipedia/commons/8/83/Brass_padlock_with_key.jpg",
};

function commonsSearchUrl(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "8",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url|mime|size",
    format: "json",
    origin: "*",
  });

  return `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
}

async function findImageUrl(query) {
  const response = await fetch(commonsSearchUrl(query), {
    headers: {
      "User-Agent": "QuinStock asset optimizer/1.0",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const pages = Object.values(data.query?.pages || {});
  const image = pages
    .map((page) => page.imageinfo?.[0])
    .filter(Boolean)
    .find((info) => {
      const isImage = ["image/jpeg", "image/png", "image/webp"].includes(info.mime);
      const isReasonableSize = !info.size || info.size < 6000000;
      return isImage && isReasonableSize && info.url;
    });

  return image?.url || null;
}

async function downloadBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "QuinStock asset optimizer/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function optimizeImage(input, productId) {
  const base = path.join(outputDir, productId);
  const pipeline = sharp(input, { failOn: "none" })
    .rotate()
    .resize(640, 640, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: false,
    });

  await pipeline.clone().webp({ quality: 72, effort: 6 }).toFile(`${base}.webp`);
  await pipeline.clone().jpeg({ quality: 72, mozjpeg: true }).toFile(`${base}.jpg`);
}

async function patchCatalogue() {
  let source = await fs.readFile(cataloguePath, "utf8");

  if (!source.includes("const productImage =")) {
    source = source.replace(
      'const categoryImage = (fileName) => `${publicUrl}/categories/${fileName}`;\n',
      'const categoryImage = (fileName) => `${publicUrl}/categories/${fileName}`;\nconst productImage = (fileName) => `${publicUrl}/products/${fileName}`;\n'
    );
  }

  for (const product of products) {
    const regex = new RegExp(
      `(\\{ id: "${product.id}", categoryId: "[^"]+", name: "[^"]+", brand: "[^"]+", price: [^,]+, unit: "[^"]+", stock: \\d+)(, imageUrl: productImage\\("[^"]+"\\))?( \\})`
    );

    source = source.replace(regex, `$1, imageUrl: productImage("${product.id}.webp")$3`);
  }

  await fs.writeFile(cataloguePath, source);
}

async function run() {
  await fs.mkdir(outputDir, { recursive: true });

  for (const product of products) {
    try {
      const imageUrl = manualImageUrls[product.id] || (await findImageUrl(product.query));
      const image = imageUrl ? await downloadBuffer(imageUrl) : await fs.readFile(fallbackImage);
      await optimizeImage(image, product.id);
      console.log(`OK ${product.id}`);
    } catch (error) {
      const fallback = await fs.readFile(fallbackImage);
      await optimizeImage(fallback, product.id);
      console.log(`FALLBACK ${product.id}: ${error.message}`);
    }
  }

  await patchCatalogue();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
