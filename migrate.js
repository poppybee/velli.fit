const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env vars manually for the script
const envPath = path.join(__dirname, '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const envVars = Object.fromEntries(env.split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('=')));

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
  const productsPath = path.join(__dirname, 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log(`Migrating ${products.length} products...`);

  for (const p of products) {
    const { error } = await supabase
      .from('products')
      .upsert({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        compare_price: p.comparePrice,
        category: p.category,
        status: p.status,
        images: p.images,
        skus: p.skus,
        rating: p.rating,
        created_at: p.createdAt
      });

    if (error) {
      console.error(`Error migrating product ${p.name}:`, error.message);
    } else {
      console.log(`Successfully migrated: ${p.name}`);
    }
  }

  console.log('Migration complete.');
}

migrate();
