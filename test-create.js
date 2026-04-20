const { createProduct, getProducts } = require('./src/lib/products');

try {
  const initialCount = getProducts().length;
  console.log('Initial count:', initialCount);

  const newProduct = createProduct({
    name: 'Test Product',
    description: 'Test Description',
    price: 99,
    comparePrice: null,
    category: 'Yoga',
    status: 'draft',
    images: [],
    skus: [],
    rating: 5
  });

  console.log('Created product:', newProduct.id);
  const finalCount = getProducts().length;
  console.log('Final count:', finalCount);

  if (finalCount === initialCount + 1) {
    console.log('SUCCESS: Product created and saved.');
  } else {
    console.log('FAILURE: Product count did not increase.');
  }
} catch (err) {
  console.error('ERROR:', err);
}
