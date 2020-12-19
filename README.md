# my-beers

A simple app to save the beers you have tasted. It was developed as an exercise on the following technologies:

- [x] MERN stack with ❤️ Typescript ❤️
- [x] Monorepo using Lerna and Yarn Workspaces
- [x] Code sharing between packages
- [x] Eslint
- [ ] Tests with Jest
- [ ] Material-ui theming
- [x] Session based authentication with Passportjs
- [ ] Support for oauth2 authorization providers, implemented login with google
- [x] CDN-based media storage
- [x] Heroku hosting featuring Continuous Delivery via automatic deploys by Heroku-Github integration
- [ ] React Native mobile app

## api

To run the app locally, the following env variables need to be defined:

```
SESSION_COOKIE_SECRET
CLOUDINARY_API_SECRET
CLOUDINARY_API_URL
CLOUDINARY_API_KEY
```

To run in production, the following env variables need to be defined:

```
MONGO_USER
MONGO_PASSWORD
MONGO_SERVER_URL
NODE_ENV
SESSION_COOKIE_SECRET
CLOUDINARY_API_SECRET
CLOUDINARY_API_URL
CLOUDINARY_API_KEY
```
