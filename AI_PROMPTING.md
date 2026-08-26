My seed script is failing with a foreign key constraint error.

I'm deleting and recreating the products and videos each time I run the
seed, and my videos use product IDs like 1, 2, 3, etc.

I think SQLite is generating different IDs after the first run.

Here's my current seed.js:

Can you help me find what's causing the foreign key error and suggest a
simple fix that makes the seed safe to run multiple times?















I'm implementing POST /api/events now.

I have the repository and service already.

I want the endpoint to validate videoId, eventType and timestamp, return
400 for a bad payload and 201 for a successful event.

Here's what I currently have:

Can you look over the flow and tell me if I'm putting the validation and
error handling in the right places?



I need to aggregate video engagement events for my dashboard.

For each video I need:
- views
- clicks
- add_to_cart conversions

Videos with no events still need to show up with zero counts.

I'm using SQLite and this is the query I wrote:

[paste your actual query]







My Express API tests use Jest and Supertest, but they're currently using
my development SQLite database.

I don't want tests changing my local development data.

What's a simple way to give Jest its own SQLite database and seed a small
amount of test data before the tests run?

I'm using the sqlite3 package and plain JavaScript.