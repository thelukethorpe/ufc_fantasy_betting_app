# Navigate into frontend root.
cd frontend

# Install NPM dependencies.
echo "Installing NPM dependencies..."
npm install --silent > /dev/null

echo "Checking style..."
npm run lint