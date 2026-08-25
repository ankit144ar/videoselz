const db = require('./database');

const products = [
  ['Classic Black T-Shirt', 29.99],
  ['Running Shoes', 89.99],
  ['Wireless Headphones', 129.99],
  ['Travel Backpack', 59.99],
  ['Denim Jacket', 79.99]
];

const videos = [
  [1, 'https://example.com/videos/tshirt-styling.mp4', 'Black T-Shirt Styling'],
  [1, 'https://example.com/videos/tshirt-review.mp4', 'Black T-Shirt Review'],
  [2, 'https://example.com/videos/running-shoes-demo.mp4', 'Running Shoes Demo'],
  [2, 'https://example.com/videos/running-shoes-unboxing.mp4', 'Running Shoes Unboxing'],
  [3, 'https://example.com/videos/headphones-review.mp4', 'Headphones Review'],
  [3, 'https://example.com/videos/headphones-demo.mp4', 'Headphones Quick Demo'],
  [4, 'https://example.com/videos/backpack-tour.mp4', 'Travel Backpack Tour'],
  [4, 'https://example.com/videos/backpack-test.mp4', 'Backpack Durability Test'],
  [5, 'https://example.com/videos/jacket-styling.mp4', 'Denim Jacket Styling'],
  [5, 'https://example.com/videos/jacket-review.mp4', 'Denim Jacket Review']
];

function runSeed() {
  db.serialize(() => {
    db.run('DELETE FROM engagement_events');
    db.run('DELETE FROM videos');
    db.run('DELETE FROM products');

    const productStatement = db.prepare(
      'INSERT INTO products (name, price) VALUES (?, ?)'
    );

    products.forEach(([name, price]) => {
      productStatement.run(name, price);
    });

    productStatement.finalize();

    const videoStatement = db.prepare(
      'INSERT INTO videos (product_id, video_url, title) VALUES (?, ?, ?)'
    );

    videos.forEach(([productId, videoUrl, title]) => {
      videoStatement.run(productId, videoUrl, title);
    });

    videoStatement.finalize(() => {
      seedEvents();
    });
  });
}

function seedEvents() {
  const eventTypes = ['view', 'click', 'add_to_cart'];

  const eventStatement = db.prepare(
    'INSERT INTO engagement_events (video_id, event_type) VALUES (?, ?)'
  );

  for (let videoId = 1; videoId <= 10; videoId += 1) {
    const viewCount = 5 + videoId;
    const clickCount = Math.floor(viewCount / 2);
    const addToCartCount = Math.floor(clickCount / 2);

    for (let i = 0; i < viewCount; i += 1) {
      eventStatement.run(videoId, eventTypes[0]);
    }

    for (let i = 0; i < clickCount; i += 1) {
      eventStatement.run(videoId, eventTypes[1]);
    }

    for (let i = 0; i < addToCartCount; i += 1) {
      eventStatement.run(videoId, eventTypes[2]);
    }
  }

  eventStatement.finalize(() => {
    console.log('Seed completed.');
    db.close();
  });
}

runSeed();