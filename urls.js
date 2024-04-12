const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Function to download a URL and save its HTML content to a file
async function downloadAndSave(url) {
  try {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const response = await new Promise((resolve, reject) => {
      protocol.get(url, resolve).on('error', reject);
    });

    const html = await new Promise((resolve, reject) => {
      let data = '';
      response.on('data', chunk => (data += chunk));
      response.on('end', () => resolve(data));
      response.on('error', reject);
    });

    const fileName = parsedUrl.hostname.replace(/^www\./, ''); // Remove 'www.' from hostname
    fs.writeFileSync(fileName, html);
    console.log(`Wrote to ${fileName}`);
  } catch (error) {
    console.error(`Couldn't download ${url}: ${error.message}`);
  }
}

// Function to read URLs from a file and start downloading them
async function downloadUrlsFromFile(fileName) {
  try {
    const urls = fs.readFileSync(fileName, 'utf8').split('\n').filter(Boolean);
    await Promise.all(urls.map(downloadAndSave));
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error.message}`);
    process.exit(1);
  }
}

// Check if the script is invoked with the correct number of arguments
if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

// Get the filename from the command-line arguments
const fileName = process.argv[2];

// Start downloading URLs from the file
downloadUrlsFromFile(fileName);
