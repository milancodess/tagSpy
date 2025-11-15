# 🕵️‍♂️ tagspy

# ❌ | Instagram structure changed, doesn't work anymore!!

**tagspy** is a stealthy Instagram story mention extractor built with Puppeteer.  
Wanna see who’s tagged in someone’s Insta story or highlight? Just drop the link and let tagspy sniff out the mentions for you — fast and easy.

---

## ⚙️ Features

- ✅ Extracts **full names** and **usernames** of mentioned users from any public Instagram story
- 🥷 Uses `puppeteer-extra` with stealth plugin to bypass bot detection
- 🔒 Session-based login via `.env` (no scraping without auth)
- 🧪 Outputs clean `mentions.json` file

---

## 🛠 Installation

```bash
git clone https://github.com/milancodess/tagspy.git
cd tagspy
npm install
````

---

## 🔐 Setup

Create a `.env` file in the root folder and add your Instagram session ID:

```env
IG_SESSION_ID=your_instagram_sessionid_here
```

> **Note:** You must be logged in on your browser, open Instagram, and copy the `sessionid` cookie manually.

---

## 🚀 Usage

1. Edit the `storyUrl` in the script:

```js
const storyUrl = 'PASTE_YOUR_INSTAGRAM_STORY_URL_HERE';
```

2. Run the script:

```bash
node index.js
```

3. Your mentions will be saved in:

```
mentions.json
```

Example output:

```json
[
  {
    "full_name": "Milan Bhandari",
    "username": "_milanbhandari_"
  },
  {
    "full_name": "Jeevan R. Magar",
    "username": "jeevan00magar"
  }
]
```

### 👀 Where to Get Your `sessionid`

1. Log in to Instagram in your browser.
2. Open **DevTools** (Right click → Inspect or press `F12`).
3. Go to the **Application** tab → **Cookies** → `https://www.instagram.com`.
4. Find and copy the value of the `sessionid` cookie.
5. Paste it into your `.env` file like this:

```env
IG_SESSION_ID=your_session_id_here
```

## ⚠️ Disclaimer

* This tool is intended for **educational** and **personal use only**.
* Respect privacy. Do **not** use it for unethical surveillance.
* Use at your own risk. Instagram may update their structure/API anytime.

---

## 🤖 Made with ❤️ by Milan Bhandari
