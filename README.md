<h1>Finance Dashboard – Next.js</h1>

<p>
This is a <strong>Finance Dashboard</strong> project built using 
<strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and 
<strong>Drag & Drop widgets</strong>. Users can dynamically add widgets using live APIs, 
map JSON fields, reorder widgets, and the dashboard state persists across refresh.
</p>

<hr />

<h2>🚀 Getting Started</h2>

<p>First, install dependencies:</p>
<pre>
npm install
</pre>

<p>Run the development server:</p>
<pre>
npm run dev
</pre>

<p>
Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the dashboard.
</p>

<p>You can start editing:</p>
<ul>
<li><code>app/page.tsx</code> — Dashboard UI + Logic</li>
<li><code>app/WidgetCard.tsx</code> — Widget Rendering</li>
</ul>

<hr />

<h2>✨ Features</h2>

<ul>
<li>🧩 Add Custom Widgets</li>
<li>✏️ Edit Widget Settings</li>
<li>❌ Delete Widgets</li>
<li>🔄 Real-time API refresh with configurable interval</li>
<li>🌍 Supports any REST API</li>
<li>🧭 JSON Field Selector using dot notation (ex: <code>rates.INR</code>)</li>
<li>🧲 Drag & Drop Widgets with persistent order</li>
<li>💾 LocalStorage persistence</li>
<li>⚠️ Loading + Error Handling</li>
<li>📱 Fully Responsive UI</li>
</ul>

<hr />

<h2>🌍 Example API</h2>

<p>Use this free public exchange API:</p>

<pre>
https://open.er-api.com/v6/latest/USD
</pre>

<p>Example fields:</p>

<pre>
rates.INR, rates.EUR, base_code
</pre>

<hr />

<h2>💾 Persistent State</h2>

<p>
All dashboard data is stored in <strong>LocalStorage</strong>, meaning:
</p>

<ul>
<li>Widgets remain after refresh</li>
<li>Layout order is preserved</li>
<li>No backend required</li>
</ul>

<hr />

<h2>🧰 Tech Stack</h2>

<ul>
<li>Next.js (App Router)</li>
<li>React</li>
<li>Tailwind CSS</li>
<li>@hello-pangea/dnd (Drag & Drop)</li>
<li>LocalStorage</li>
</ul>

<hr />

<h2>📚 Learn More</h2>

<ul>
<li><a href="https://nextjs.org/docs">Next.js Documentation</a></li>
<li><a href="https://nextjs.org/learn">Learn Next.js</a></li>
<li><a href="https://github.com/vercel/next.js">Next.js GitHub Repo</a></li>
</ul>

<hr />

<h2>🚀 Deploy on Vercel</h2>

<p>
The easiest way to deploy is via <a href="https://vercel.com">Vercel</a>.
</p>

<p>
Deployment Docs: 
<a href="https://nextjs.org/docs/app/building-your-application/deploying">
Next.js Deployment Guide
</a>
</p>

<hr />

<h2>👤 Author</h2>

<p>
<strong>Your Name</strong><br />
GitHub: https://github.com/yourusername <br />
Email: your@email.com
</p>
