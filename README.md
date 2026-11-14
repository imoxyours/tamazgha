# Tamazgha / تامزغا
Run: `npm install && npm run dev` then open http://localhost:3000
Add a place: edit `src/data/places.json` (id, name, region, desc).
Add a language: copy `src/i18n/en.json` to `xx.json`, translate, register it in `src/lib/utils.ts`.
Deploy: push to GitHub, import the repo on vercel.com, set the variables from `.env.example`.

## Admin
Generate the hash (use a 12+ character password):
`node -e "const c=require('crypto');const s=c.randomBytes(16).toString('hex');console.log(s+':'+c.scryptSync(process.argv[1],s,64).toString('hex'))" "YOUR_PASSWORD"`
Put the result in ADMIN_PASSWORD_HASH, and a random 32+ character string in ADMIN_SESSION_SECRET. Admin lives at /admin.
## Images
Put .webp files (under 200KB) in public/assets, named as in src/data/gallery.json.

## Admin setup (full)
1. Database: on Vercel add the Neon (Postgres) integration, it sets DATABASE_URL. Tables are created and seeded automatically on first request.
2. Images: add a Vercel Blob store, it sets BLOB_READ_WRITE_TOKEN.
3. ADMIN_SESSION_SECRET: random string, 32+ characters. ADMIN_PASSWORD_HASH: see the Admin section above.
4. 2FA secret, then add it manually (time-based) in Google Authenticator or similar:
`node -e "const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';let b='';for(const x of require('crypto').randomBytes(20))b+=x.toString(2).padStart(8,'0');let s='';for(let i=0;i<b.length;i+=5)s+=A[parseInt(b.slice(i,i+5).padEnd(5,'0'),2)];console.log(s)"`
5. Login at /admin needs password + 6-digit code. Without these variables the admin stays locked.
## Launch
Set NEXT_PUBLIC_SITE_URL to the real domain (used by sitemap, robots and Open Graph). Analytics load only after cookie consent.

## Email (Resend)
Create an API key at resend.com, verify your domain, then set RESEND_API_KEY, CONTACT_FROM_EMAIL (an address on the verified domain) and CONTACT_TO_EMAIL (your inbox).
## Languages
Routes: / (Arabic), /fr, /en. UI texts live in src/i18n/*.json. Articles and places are written in Arabic only (they come from the admin).
## Community photos
Visitors submit at /share. Photos stay pending until approved in /admin. Rejecting deletes the photo from Blob.

## Troubleshooting
If you see a build error from globals.css or Tailwind: delete the node_modules folder, package-lock.json and .next, then run `npm install` and `npm run dev` again.
