const db = require('./database');

const products = [
  {
    name: 'Classic Black T-Shirt',
    price: 29.99
  },
  {
    name: 'Running Shoes',
    price: 89.99
  },
  {
    name: 'Wireless Headphones',
    price: 129.99
  },
  {
    name: 'Travel Backpack',
    price: 59.99
  },
  {
    name: 'Denim Jacket',
    price: 79.99
  }
];

const videos = [
  {
    productIndex: 0,
    videoUrl: 'https://example.com/videos/tshirt-styling.mp4',
    title: 'Black T-Shirt Styling'
  },
  {
    productIndex: 0,
    videoUrl: 'https://example.com/videos/tshirt-review.mp4',
    title: 'Black T-Shirt Review'
  },
  {
    productIndex: 1,
    videoUrl: 'https://example.com/videos/running-shoes-demo.mp4',
    title: 'Running Shoes Demo'
  },
  {
    productIndex: 1,
    videoUrl: 'https://example.com/videos/running-shoes-unboxing.mp4',
    title: 'Running Shoes Unboxing'
  },
  {
    productIndex: 2,
    videoUrl: 'https://example.com/videos/headphones-review.mp4',
    title: 'Headphones Review'
  },
  {
    productIndex: 2,
    videoUrl: 'https://example.com/videos/headphones-demo.mp4',
    title: 'Headphones Quick Demo'
  },
  {
    productIndex: 3,
    videoUrl: 'https://example.com/videos/backpack-tour.mp4',
    title: 'Travel Backpack Tour'
  },
  {
    productIndex: 3,
    videoUrl: 'https://example.com/videos/backpack-test.mp4',
    title: 'Backpack Durability Test'
  },
  {
    productIndex: 4,
    videoUrl: 'https://example.com/videos/jacket-styling.mp4',
    title: 'Denim Jacket Styling'
  },
  {
    productIndex: 4,
    videoUrl: 'https://example.com/videos/jacket-review.mp4',
    title: 'Denim Jacket Review'
  }
];

function runSeed() {
  db.serialize(() => {
    db.exec(
      `
        DELETE FROM engagement_events;
        DELETE FROM videos;
        DELETE FROM products;
      `,
      (error) => {
        if (error) {
          console.error('Failed to clear existing data:', error.message);
          process.exit(1);
        }

        const productIds = [];

        const productStatement = db.prepare(
          'INSERT INTO products (name, price) VALUES (?, ?)'
        );

        products.forEach((product, index) => {
          productStatement.run(
            product.name,
            product.price,
            function (insertError) {
              if (insertError) {
                console.error('Failed to insert product:', insertError.message);
                process.exit(1);
              }

              productIds[index] = this.lastID;
            }
          );
        });

        productStatement.finalize(() => {
          seedVideos(productIds);
        });
      }
      );
  });
}

function seedVideos(productIds) {
  const videoIds = [];

  const videoStatement = db.prepare(
    `
      INSERT INTO videos (product_id, video_url, title)
      VALUES (?, ?, ?)
    `
  );

  videos.forEach((video, index) => {
    const productId = productIds[video.productIndex];

    videoStatement.run(
      productId,
      video.videoUrl,
      video.title,
      function (error) {
        if (error) {
          console.error('Failed to insert video:', error.message);
          process.exit(1);
        }

        videoIds[index] = this.lastID;
      }
    );
  });

  videoStatement.finalize(() => {
    seedEvents(videoIds);
  });
}

function seedEvents(videoIds) {
  const eventStatement = db.prepare(
    `
      INSERT INTO engagement_events (video_id, event_type)
      VALUES (?, ?)
    `
  );

  videoIds.forEach((videoId, index) => {
    const viewCount = 5 + index;
    const clickCount = Math.floor(viewCount / 2);
    const addToCartCount = Math.floor(clickCount / 2);

    for (let i = 0; i < viewCount; i += 1) {
      eventStatement.run(videoId, 'view');
    }

    for (let i = 0; i < clickCount; i += 1) {
      eventStatement.run(videoId, 'click');
    }

    for (let i = 0; i < addToCartCount; i += 1) {
      eventStatement.run(videoId, 'add_to_cart');
    }
  });

  eventStatement.finalize((error) => {
    if (error) {
      console.error('Failed to seed events:', error.message);
      process.exit(1);
    }

    console.log('Seed completed successfully.');
    db.close();
  });
}

runSeed();