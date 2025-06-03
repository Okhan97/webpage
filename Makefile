# Define commands
install:
	@echo "Fresh installing dependencies..."
	rm -rf node_modules package-lock.json
	npm install

run:
	@echo "Starting the development server..."
	npm run dev