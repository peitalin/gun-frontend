
## Admin Dashboard

### Instructions
1. first run `npm run generate-local-certs`. This will generate local certs for the front-end app to use for HTTPS.


#### Run docker
2. Run docker in the `efc-frenz-configs` directory to get `efc-frenzy-backend` running in the background
```
# efc-frenzy-configs directory
docker-compose -f docker-compose-base.yml -f docker-compose-local.yml up --build
```

3. Run docker in the `efc-configs` directory to get
`gateway`, and all other services running in the background
```
# efc-configs directory
docker-compose -f docker-compose-prebuild.yml up
# or
docker-compose -f docker-compose-loca.yml up
```

4. Run `npm run dev` in the `efc-admin` directory.
This will build the next.js app for the front-end. Then the front-end image in docker will be available
from port 2040 at: ```https://0.0.0.0:2040```

This will start a development server with webpack running.

5. To run a production build, use `npm run build; npm run start`.


### Deployment
Currently deploys to netlify with `npm run build; npm run export`
