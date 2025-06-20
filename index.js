require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const storyUrl = 'PASTE_YOUR_INSTAGRAM_STORY_URL_HERE'; // Replace with your Instagram story URL
const IG_COOKIES = [
  {
    name: 'sessionid',
    value: process.env.IG_SESSION_ID,
    domain: '.instagram.com',
    path: '/',
    httpOnly: true,
    secure: true,
  }
];

async function extractMentionsFromInstagramStory(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/114.0.0.0 Safari/537.36'
    );

    if (IG_COOKIES.length > 0) {
      await page.setCookie(...IG_COOKIES);
    }

    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    await new Promise(resolve => setTimeout(resolve, 5000));

    const html = await page.content();

    const mentionRegex = /"ig_mention"\s*:\s*\{\s*"full_name"\s*:\s*"([^"]+)",\s*"username"\s*:\s*"([^"]+)"\s*\}/g;
    const mentions = [];
    let match;

    while ((match = mentionRegex.exec(html)) !== null) {
      mentions.push({
        full_name: match[1],
        username: match[2]
      });
    }

    const filePath = path.resolve('mentions.json');
    fs.writeFileSync(filePath, JSON.stringify(mentions, null, 2), 'utf-8');
    console.log(`✅ Mentions extracted and saved to ${filePath}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await browser.close();
  }
}

extractMentionsFromInstagramStory(storyUrl);