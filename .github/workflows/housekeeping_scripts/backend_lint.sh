# Navigate into backend root.
cd backend

# Install Maven dependencies.
echo "Resolving Maven plugins..."
mvn dependency:resolve-plugins -T1C > /dev/null

# Run Maven checkstyle.
echo "Checking style..."
mvn com.coveo:fmt-maven-plugin:check -q
