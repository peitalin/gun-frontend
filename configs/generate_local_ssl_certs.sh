# Move up to root if running from configs
if [ ${PWD##*/} == 'configs' ]; then
  cd ..
fi

# Make the certificates
mkcert -install
mkcert localhost 127.0.0.1 0.0.0.0 35.244.114.44

# Move them to certs directory (creating if non existent)
mkdir -p ./configs/certs
mv localhost+3.pem ./configs/certs/localhost-cert.pem
mv localhost+3-key.pem ./configs/certs/localhost-key.pem

# Change mode so they can be read
chmod 400 ./configs/certs/localhost-cert.pem
chmod 400 ./configs/certs/localhost-key.pem