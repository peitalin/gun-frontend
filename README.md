

### Instructions
1. first run `npm run generate-local-certs`. This will generate local certs for the front-end app to use for HTTPS.


2. Run `npm run dev`
This will build the next.js app for the front-end. Then the front-end image in docker will be available
from port 9000 at: ```https://0.0.0.0:9000```

This will start a development server with webpack running.

3. To run a production build, use `npm run build; npm run start`.


### Deployment
Currently deploys to vercel.com whenever you push to `develop` or `master`
