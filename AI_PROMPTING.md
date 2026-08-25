My seed script is failing with a foreign key constraint error.

I'm deleting and recreating the products and videos each time I run the
seed, and my videos use product IDs like 1, 2, 3, etc.

I think SQLite is generating different IDs after the first run.

Here's my current seed.js:

Can you help me find what's causing the foreign key error and suggest a
simple fix that makes the seed safe to run multiple times?