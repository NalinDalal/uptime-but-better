# upTime | Monitoring Platform

Here’s a **structured implementation plan** for your full-stack uptime monitoring + real-time analytics app (TomatoTrack), using **Next.js**, **Prisma**, **JWT**, and **cron-based uptime checks**.

---

## ✅ Phase 1: Authentication (JWT + Prisma)

### Step 1: Basic Auth

- **\[ ] `/api/signup`**: create a single hardcoded user (email + password hash)
- **\[ ] `/api/signin`**: verify credentials, return a **JWT token**
- **\[ ] Middleware**: protect `/dashboard`, `/api/*`, etc., by verifying the JWT in cookies or headers

**Prisma Schema (Partial)**:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  services  Service[]
}
```

---

## ✅ Phase 2: Service Setup

### Step 2: User Adds Monitored Site

- **UI**: form to add a site, 2 email addresses (on-call engineers), and monitoring frequency (e.g. every 15 min)
- **POST `/api/service`**: save in DB

**Prisma Schema (Partial)**:

```prisma
model Service {
  id          String    @id @default(cuid())
  url         String
  interval    Int       // in minutes
  email1      String
  email2      String
  lastStatus  Int?
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  logs        Log[]
}
```

---

## ✅ Phase 3: Cron Job for Uptime Monitoring

### Step 3: Ping Sites Periodically

- **cron.ts** or `/api/cron/check-sites` endpoint, called on a schedule
- **\[ ] GET each URL**
- **\[ ] If status !== 200 → send email to `email1` & `email2`**
- **\[ ] Save result to `Log` table**

**Prisma Schema (Additional)**:

```prisma
model Log {
  id         String   @id @default(cuid())
  serviceId  String
  status     Int
  timestamp  DateTime @default(now())
  service    Service  @relation(fields: [serviceId], references: [id])
}
```

### Email Format (Example):

```txt
Hey Rakesh,
Your site https://example.com returned status 503 (Service Unavailable).
Kindly check and contact your service provider.
```

---

## ✅ Phase 4: Dashboard & Slugs

### Step 4: Dashboards

- **\[ ] `/dashboard`**: list all URLs monitored by the user

  - Show basic stats: last ping status, success rate
  - CTA: View Details

- **\[ ] `/dashboard/[slug]`**: per-site detail

  - Fetch logs, display with **Recharts**
  - Filters: last 24h, 7d
  - Stats: avg response, uptime %, most recent status

---

## ✅ Phase 5: Tracking Script

### Step 5: Analytics Tracking

- **\[ ] `/public/track.js`**: script to embed on client sites

  - Captures: page views, time on page, clicks
  - Sends to: `POST /api/track`

- **\[ ] `/api/track`**: store events
- **\[ ] `/api/stats`**: get aggregate stats

**Tracking DB Tables**:

```prisma
model Session {
  id        String   @id @default(cuid())
  site      String
  createdAt DateTime @default(now())
  events    Event[]
}

model Event {
  id         String   @id @default(cuid())
  sessionId  String
  type       String   // click, view, etc.
  timestamp  DateTime @default(now())
  data       Json
  session    Session  @relation(fields: [sessionId], references: [id])
}
```

---

## ✅ Phase 6: Real-Time Updates (Optional)

- **WebSockets** or **Server-Sent Events** (SSE) to push live ping results and analytics
- **Redis Pub/Sub** if scaling needed

---

## ✅ To Do Next (Summarized)

### APIs:

- [ ] `POST /api/service`: create a monitored service
- [ ] `GET /api/services`: list user’s sites
- [ ] `GET /api/services/[slug]`: get details/stats
- [ ] `POST /api/track`: store analytics
- [ ] `GET /api/stats`: fetch analytics

### Pages:

- [ ] `/signup`, `/signin`: auth pages
- [ ] `/dashboard`: list of monitored URLs
- [ ] `/dashboard/[slug]`: detailed view of one site

### Cron:

- [ ] `cron.ts` or terminal script to ping URLs
- [ ] Save response codes to logs
- [ ] Email on non-200 status

### Dev Seed:

- [ ] `prisma/seed.ts`:

  - One test user
  - A few dummy services
  - Optional: logs pre-filled

  17.05:
  init of the application, made db

dev migration, then client generation,

to push dummy data/seed data: `node --loader ts-node/esm prisma/seed.ts`
`npx prisma studio` - to visualise db

18/05:

1. check for authentication now; make sure the authentication runs properly
