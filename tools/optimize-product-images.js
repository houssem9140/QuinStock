const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "Frontend", "public");
const productDir = path.join(publicDir, "products");
const categoryDir = path.join(publicDir, "categories");
const fallbackImage = path.join(publicDir, "hardware-hero.jpg");

const productAssets = [
  { id: "vis-bois-50", query: "wood screw black countersunk" },
  { id: "cheville-nylon-8", query: "nylon wall plug screw anchor" },
  { id: "boulon-m8", query: "hex bolt nut washer" },
  { id: "vanne-laiton", query: "brass ball valve plumbing" },
  { id: "raccord-cuivre", query: "copper pipe fitting plumbing" },
  { id: "flexible-inox", query: "stainless steel braided hose plumbing" },
  { id: "cle-molette", query: "adjustable wrench tool" },
  { id: "tournevis-set", query: "screwdriver set tools" },
  { id: "forets-metal", query: "drill bit set metal" },
  { id: "gaine-icta", query: "electrical conduit flexible" },
  { id: "domino-16", query: "electrical terminal block connector" },
  { id: "boite-derivation", query: "electrical junction box" },
  { id: "rouleau-peinture", query: "paint roller" },
  { id: "ruban-masquage", query: "masking tape roll" },
  { id: "bac-peinture", query: "paint tray roller" },
  { id: "gants-nitrile", query: "nitrile work gloves" },
  { id: "lunettes-protection", query: "safety goggles glasses" },
  { id: "cadenas-laiton", query: "brass padlock" },
];

const categoryAssets = [
  { id: "fixation", query: "screws bolts nuts hardware assortment" },
  { id: "plomberie", query: "plumbing fittings pipes valves" },
  { id: "outillage", query: "hand tools workshop" },
  { id: "electricite", query: "electrical connectors cables tools" },
  { id: "peinture", query: "paint roller tray brush" },
  { id: "securite", query: "safety gloves goggles construction" },
];

const manualImageUrls = {
  fixation: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Schrauben%2C_Muttern_und_Unterlegscheiben_--_2020_--_4150.jpg/960px-Schrauben%2C_Muttern_und_Unterlegscheiben_--_2020_--_4150.jpg",
  plomberie: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Kupferfittings_4062.jpg",
  outillage: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Spoke_wrench_in_use.jpg",
  electricite: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/USSR_terminals_for_split-ring_connections.JPG/960px-USSR_terminals_for_split-ring_connections.JPG",
  peinture: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Paint_tray_%284600214997%29.jpg/960px-Paint_tray_%284600214997%29.jpg",
  securite: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Lalan_Work_Gloves.jpg",
  "vis-bois-50": "https://upload.wikimedia.org/wikipedia/commons/8/85/Black_wood_screw_with_flat_Phillips_head.jpg",
  "cheville-nylon-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tasselli_wall_plug.jpg/960px-Tasselli_wall_plug.jpg",
  "boulon-m8": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Schrauben%2C_Muttern_und_Unterlegscheiben_--_2020_--_4150.jpg/960px-Schrauben%2C_Muttern_und_Unterlegscheiben_--_2020_--_4150.jpg",
  "vanne-laiton": "https://upload.wikimedia.org/wikipedia/commons/d/da/Brass-Ball-Valve_MF_Butterfly_12592-360x480_%284999932531%29.jpg",
  "raccord-cuivre": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Kupferfittings_4062.jpg",
  "flexible-inox": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Evolity_Stahlflex_Bremsleitung.jpg/960px-Evolity_Stahlflex_Bremsleitung.jpg",
  "cle-molette": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Adjustable_spanner_20101109.jpg/960px-Adjustable_spanner_20101109.jpg",
  "tournevis-set": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robertson_screwdriver_set.jpg/960px-Robertson_screwdriver_set.jpg",
  "forets-metal": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2010-01-21_Craftsman_Professional_cobalt_drill_bit_set.jpg/960px-2010-01-21_Craftsman_Professional_cobalt_drill_bit_set.jpg",
  "gaine-icta": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Electrical_conduit.JPG/960px-Electrical_conduit.JPG",
  "domino-16": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/USSR_terminals_for_split-ring_connections.JPG/960px-USSR_terminals_for_split-ring_connections.JPG",
  "boite-derivation": "https://upload.wikimedia.org/wikipedia/commons/2/24/Exterior_junction_box_3.jpg",
  "rouleau-peinture": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Paint_roller_3.jpg/960px-Paint_roller_3.jpg",
  "ruban-masquage": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Malerkrepp.jpg/960px-Malerkrepp.jpg",
  "bac-peinture": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Paint_tray_%284600214997%29.jpg/960px-Paint_tray_%284600214997%29.jpg",
  "gants-nitrile": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Lalan_Work_Gloves.jpg",
  "lunettes-protection": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Safety_Goggles.jpg/960px-Safety_Goggles.jpg",
  "cadenas-laiton": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Brass_padlock_with_key.jpg/960px-Brass_padlock_with_key.jpg",
};

const localFallbacks = [];

const blockedTitleWords = [
  "logo",
  "icon",
  "svg",
  "diagram",
  "map",
  "portrait",
  "person",
  "people",
];

function commonsSearchUrl(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "18",
    gsrsearch: `${query} filetype:bitmap`,
    prop: "imageinfo",
    iiprop: "url|mime|size|dimensions",
    format: "json",
    origin: "*",
  });

  return `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
}

async function findImageUrl(query) {
  const response = await fetch(commonsSearchUrl(query), {
    headers: {
      "User-Agent": "QuinStock asset optimizer/1.0 (portfolio demo)",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const pages = Object.values(data.query?.pages || {});
  const matches = pages
    .map((page) => ({ title: page.title || "", info: page.imageinfo?.[0] }))
    .filter(({ title, info }) => {
      const normalizedTitle = title.toLowerCase();
      const isBlocked = blockedTitleWords.some((word) => normalizedTitle.includes(word));
      const isImage = ["image/jpeg", "image/png", "image/webp"].includes(info?.mime);
      const hasUrl = Boolean(info?.url);
      const isReasonableSize = !info?.size || info.size < 7000000;
      const isLargeEnough = !info?.width || (info.width >= 320 && info.height >= 240);

      return !isBlocked && isImage && hasUrl && isReasonableSize && isLargeEnough;
    });

  return matches[0]?.info.url || null;
}

async function downloadBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "QuinStock asset optimizer/1.0 (portfolio demo)",
    },
  });

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function optimizeSquare(input, outputDir, id) {
  const pipeline = sharp(input, { failOn: "none" })
    .rotate()
    .resize(520, 520, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: false,
    });

  await pipeline.clone().webp({ quality: 64, effort: 6 }).toFile(path.join(outputDir, `${id}.webp`));
  await pipeline.clone().jpeg({ quality: 68, mozjpeg: true }).toFile(path.join(outputDir, `${id}.jpg`));
}

async function optimizeCategory(input, outputDir, id) {
  await sharp(input, { failOn: "none" })
    .rotate()
    .resize(760, 520, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: false,
    })
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(path.join(outputDir, `${id}.jpg`));
}

async function processAsset(asset, outputDir, optimizer) {
  const url = manualImageUrls[asset.id] || (await findImageUrl(asset.query));
  const input = url ? await downloadBuffer(url) : await fs.readFile(fallbackImage);
  await optimizer(input, outputDir, asset.id);
  console.log(`${url ? "OK" : "FALLBACK"} ${asset.id}${url ? ` ${url}` : ""}`);
}

async function run() {
  await fs.mkdir(productDir, { recursive: true });
  await fs.mkdir(categoryDir, { recursive: true });

  for (const asset of categoryAssets) {
    try {
      await processAsset(asset, categoryDir, optimizeCategory);
    } catch (error) {
      console.log(`SKIP ${asset.id}: ${error.message}`);
    }

    await wait(2200);
  }

  for (const asset of productAssets) {
    try {
      await processAsset(asset, productDir, optimizeSquare);
    } catch (error) {
      console.log(`SKIP ${asset.id}: ${error.message}`);
    }

    await wait(2200);
  }

  for (const fallback of localFallbacks) {
    try {
      if (fallback.type === "category") {
        await optimizeCategory(await fs.readFile(fallback.source), categoryDir, fallback.target);
      } else {
        await optimizeSquare(await fs.readFile(fallback.source), productDir, fallback.target);
      }
      console.log(`LOCAL ${fallback.target}`);
    } catch (error) {
      console.log(`LOCAL_SKIP ${fallback.target}: ${error.message}`);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
