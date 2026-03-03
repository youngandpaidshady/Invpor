const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9876;
const RAW_DIR = path.join(__dirname, 'raw_prompts');

if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
    // CORS headers so browser can POST to us
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/save') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const slug = data.slug;
                const filePath = path.join(RAW_DIR, slug + '.json');
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                console.log(`[SAVED] ${slug}: ${data.prompts ? data.prompts.length : 0} prompts -> ${filePath}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, slug: slug }));
            } catch (e) {
                console.error('[ERROR]', e.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: e.message }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/status') {
        // List all saved files
        const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
        const status = files.map(f => {
            const data = JSON.parse(fs.readFileSync(path.join(RAW_DIR, f), 'utf8'));
            return { slug: f.replace('.json', ''), count: data.prompts ? data.prompts.length : 0 };
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ totalFiles: files.length, files: status }));
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Scrape server listening on http://localhost:${PORT}`);
    console.log(`POST /save - Save prompts data`);
    console.log(`GET /status - Check saved files`);
});
