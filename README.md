# mpscsarathi-web (`mpscsarathi.online`)

Official source repository for **MPSC Sarathi (`mpscsarathi.online`)** — Maharashtra Public Service Commission (MPSC) Rajyaseva & Combine Group B/C study portal, multi-subdomain content network, reference bookstore, and AdSense/Affiliate monetization suite.

---

## 1. Subdomain Architecture

| Subdomain / Host | DNS Type | Name / Host | Target | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `mpscsarathi.online` | `A` | `@` | Hosting IP | Main Portal & Exam Strategy |
| `notes.mpscsarathi.online` | `CNAME` | `notes` | `mpscsarathi.online` | GS I–IV Long-Form Marathi Study Notes |
| `pyq.mpscsarathi.online` | `CNAME` | `pyq` | `mpscsarathi.online` | Previous Year Question Analysis (2013–2025) |
| `currentaffairs.mpscsarathi.online` | `CNAME` | `currentaffairs` | `mpscsarathi.online` | Daily Current Affairs & Economic Survey |
| `books.mpscsarathi.online` | `CNAME` | `books` | `mpscsarathi.online` | Verified MPSC Reference Books (Affiliate Store) |

---

## 2. Local Development & Build

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle (outputs to /dist)
npm run build
```

---

## 3. Deploying `mpscsarathi-web` from GitHub (Vercel / Netlify / Cloudflare Pages / Hostinger)

1. Push this repository to **`mpscsarathi-web`** on GitHub.
2. Connect your GitHub repository to **Vercel**, **Cloudflare Pages**, or **Netlify** (free automatic deployments on every `git push`):
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. In your hosting dashboard under **Custom Domains**, add:
   - `mpscsarathi.online`
   - `notes.mpscsarathi.online`
   - `pyq.mpscsarathi.online`
   - `currentaffairs.mpscsarathi.online`
   - `books.mpscsarathi.online`
4. In Google AdSense, add `mpscsarathi.online` under **Sites** and replace the Publisher ID in `ads.txt` once issued.
