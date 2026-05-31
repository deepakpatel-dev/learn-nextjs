import Link from "next/link";

export default function NodejsServerPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">Deploying</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Node.js Server</h1>
        <p className="text-gray-500 leading-relaxed">
          Self-host on any VPS, bare metal, or PaaS that runs Node.js 18+. Full feature support —
          Server Actions, API Routes, Middleware, streaming, and image optimization all work.
        </p>
      </div>

      {/* Build and start */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Build and start</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# 1. Build for production
npm run build        # → creates .next/ directory

# 2. Start the server
npm run start        # → runs on port 3000 by default
PORT=8080 npm start  # → custom port

# package.json scripts (already configured by create-next-app)
{
  "scripts": {
    "dev":   "next dev",
    "build": "next build",
    "start": "next start",
    "lint":  "eslint"
  }
}`}
        </pre>
      </div>

      {/* PM2 */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Production process manager — PM2</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# Install PM2 globally
npm install -g pm2

# Start with PM2 (auto-restarts on crash)
pm2 start npm --name "nextjs" -- start

# ecosystem.config.js — for more control
module.exports = {
  apps: [{
    name:   "nextjs",
    script: "npm",
    args:   "start",
    cwd:    "/var/www/my-app",
    env: {
      NODE_ENV: "production",
      PORT:     3000,
    },
    // Auto-restart on memory leak
    max_memory_restart: "1G",
    // Cluster mode — use all CPU cores
    instances: "max",
    exec_mode: "cluster",
  }],
};

# Save process list and enable startup on reboot
pm2 save
pm2 startup`}
        </pre>
      </div>

      {/* Nginx reverse proxy */}
      <div>
        <h2 className="font-semibold text-gray-800 mb-3">Nginx reverse proxy</h2>
        <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 text-xs overflow-x-auto leading-relaxed">
{`# /etc/nginx/sites-available/my-next-app
server {
    listen 80;
    server_name example.com www.example.com;

    # Redirect HTTP → HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Proxy all requests to Next.js on port 3000
    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}`}
        </pre>
      </div>

      {/* Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
        <p className="font-semibold text-blue-900 mb-2">Tips for production</p>
        <ul className="space-y-1.5 text-xs list-disc list-inside">
          <li>Set <code className="font-mono">NODE_ENV=production</code> — enables React production mode and Next.js optimizations.</li>
          <li>Run <code className="font-mono">next build</code> on the server or in CI, not on your laptop.</li>
          <li>Use <code className="font-mono">output: &apos;standalone&apos;</code> in <code className="font-mono">next.config.ts</code> to reduce deployment size (copies only required node_modules).</li>
          <li>Health check endpoint: <code className="font-mono">GET /api/health</code> returning 200 — used by load balancers.</li>
          <li>Sharp package for image optimization: <code className="font-mono">npm i sharp</code></li>
        </ul>
      </div>

      <Link href="/deploying" className="text-sm text-gray-400 hover:text-green-600 transition-colors">← Deploying overview</Link>
    </div>
  );
}
