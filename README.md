# my-beers

## api

To run in production, you'll need to define some env variables:

```
MONGO_USER
MONGO_PASSWORD
MONGO_SERVER_URL
SESSION_COOKIE_SECRET
NODE_ENV
```

if NODE_ENV is not `'prod'`, only `SESSION_COOKIE_SECRET` needs to be set.
