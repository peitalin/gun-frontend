#!/bin/sh

# Expecting these input args
PROJECT_ID=$1
TRIGGER_ID=$2
BRANCH_NAME=$3

# Make the build trigger execute
res=$(curl -X POST \
    --header "Authorization: Bearer $(gcloud config config-helper \
              --format='value(credential.access_token)')" \
    --header "Content-Type: application/json" \
    --data '{"branchName": "'$BRANCH_NAME'"}' \
    --silent \
    --output /dev/null \
    -w %{http_code} \
    https://cloudbuild.googleapis.com/v1/projects/"$PROJECT_ID"/triggers/"$TRIGGER_ID":run)
echo $res
if [ $res -eq 200 ]
then echo "Deployment triggered!"; exit 0
else echo "Failed to connect to deploy trigger"; exit 1
fi