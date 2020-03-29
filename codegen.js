module.exports = {
    "schema": [
        {
            "https://api.gunmarketplace.com.au/v1/graphql": {
                "headers": {
                    "Authorization": "Bearer " + process.env.AUTH_TOKEN,
                    "x-hasura-admin-secret": "hescomingrightforus"
                }
            }
        }
    ],
    "documents": [
        // "./queries/*.ts",
        "./queries/gun-queries.ts",
        "./queries/gun-mutations.ts",
    ],
    "overwrite": true,
    "generates": {
        "./typings/gqlTypes.tsx": {
            "plugins": [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ],
            "config": {
              "skipTypename": false,
              "withHooks": true,
              "withHOC": false,
              "withComponent": false
            }
        },
        "./typings/graphql.schema.json": {
          "plugins": [
                "introspection"
          ]
        }
    }
};