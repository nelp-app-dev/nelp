# Install Redis
sudo apt-get update
sudo apt-get install -y redis-server

# Install Postgres
# Manually create user "nelp" and databases "nelp" and "nelp-test"
sudo apt-get update
sudo apt-get install -y postgresql

# Install Nginx
# to reload nginx -> sudo systemctl reload nginx
sudo apt-get update
sudo apt-get install -y nginx
