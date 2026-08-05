# Charlotte Wilson for Princeton ISD School Board — Campaign Website

> **Campaign Theme**: Results Over Rhetoric  
> **Core Campaign Question**: *Will this help students learn?*

This is a complete, production-ready campaign website built with **Next.js (App Router)**, **TypeScript**, **Vanilla CSS Modules**, **PostgreSQL**, and **Prisma ORM**.

---

## 🌟 Key Features

1. **Teacher-Led, Nonpartisan Presentation**: Introduces Charlotte Wilson (Special Education Department Chair, Pre-K Team Lead, former Princeton ISD teacher, and Princeton ISD parent) with professional optimism.
2. **"Results Over Rhetoric" Hub**: Dedicated page detailing the 5-question decision-making framework Charlotte will apply as a trustee.
3. **Interactive Priorities**: Deep dive into the 6 campaign pillars with challenges, principles, and measurable success criteria.
4. **Accessible Public Components**: Accordions, skip-to-content links, HSL color system, dark maroon & gold color palette, custom text/SVG logo, and clean mobile navigation drawers.
5. **Secure Campaign Admin Portal**:
   - Single static password protection (`Charlotte#1` by default).
   - HTTP-only JWT session authentication running via Next.js Edge Middleware.
   - Dashboard tab controls for:
     - Global campaign email, phone, mailing address, social links, biography, and legal disclaimer.
     - Homepage top Announcement bar toggles.
     - FAQ item creation, editing, re-ordering, and drafting.
     - Campaign calendar events & biography timeline manager.
     - Campaign news articles and updates writer with custom slug generator and SEO metadata overrides.
     - Supporter log viewer for Volunteer signups and Contact inquiries.
     - **Direct CSV Data Export**: Downloads submission logs directly into CSV spreadsheets for field organizers.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: Local or hosted database instance (e.g. Supabase, Railway, Neon, or local Postgres server)

### 2. Environment Configuration
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values in `.env`:
```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://username:password@localhost:5432/charlotte_campaign?schema=public"

# Admin Dashboard Password (Default: Charlotte#1)
ADMIN_PASSWORD="Charlotte#1"

# JWT Secret for Session Cookies
JWT_SECRET="charlotte-wilson-campaign-jwt-secret-key-2026"

# Node Environment
NODE_ENV="development"
```

### 3. Install Dependencies & Generate Prisma Client
```bash
npm install
npx prisma generate
```

### 4. Run Database Migrations & Seed Data
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Admin Dashboard Usage

- **Login URL**: `/admin` (Not listed in public navigation menus)
- **Default Password**: `Charlotte#1`
- **Dashboard URL**: `/admin/dashboard`

### Managing Content & Inquiries
1. **Global Settings**: Modify campaign email, phone, mailing address, social links, candidate biography, and legal footer disclaimer.
2. **Announcement Bar**: Enable or disable the top yellow notification bar across all pages.
3. **CSV Exporting**: Navigate to **Form Submissions**, select Volunteer Submissions or Contact Inquiries, and click **Export List as CSV** to download supporter rosters.

---

## 📦 Production Deployment

### Building for Production
```bash
npm run build
npm run start
```

---

## 📋 Content & Compliance Guidelines
- **Strict Fact Verification**: All biography data, positions, and priorities reflect verified candidate experience. No false endorsements or fake dates have been added.
- **Child Privacy**: No photos of non-family minors or classrooms are displayed without explicit authorization. Visual treatments use clean icons, graphics, and candidate portraits.
