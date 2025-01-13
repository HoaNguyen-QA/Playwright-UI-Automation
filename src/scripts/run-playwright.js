import { execSync } from 'child_process';

// Log arguments for debugging
console.log('Full Arguments:', process.argv);

const args = process.argv.slice(2);
console.log('Parsed Arguments:', args);

// Extract the `--url` flag
const urlArg = args.find(arg => arg.startsWith('--url='));
const url = urlArg?.split('=')[1];

if (!url) {
  console.error('Error: Please provide a URL using the --url flag (e.g., npm run test -- --url=https://example.com)');
  process.exit(1);
}

console.log(`Running tests with URL: ${url}`);

// Run Playwright with the TEST_URL environment variable
try {
    const command = process.platform === 'win32'
    ? `set TEST_URL=${url} && npx playwright test`
    : `TEST_URL=${url} npx playwright test`;
  
  execSync(command, { stdio: 'inherit' });
  
} catch (error) {
  console.error('Failed to run the Playwright test:', error.message);
  process.exit(1);
}
