
## Setup Instructions

1. **Install dependencies**
```bash
npm install
```

2. **Add your API keys to `.env`**
```
PORT=3000
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini
```

3. **Start the server**
```bash
npm start
```

Server runs on `http://localhost:3000`

## Running Tests

### Run Unit Tests
```bash
npm test
```
This will run all test files using Jest and display the test results.

### Run Tests with Coverage Report
```bash
npm run test:coverage
```
This will run all tests and generate a coverage report showing code coverage percentages for statements, branches, functions, and lines.
