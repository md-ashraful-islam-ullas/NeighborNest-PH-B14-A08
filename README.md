# NeighborNest

NeighborNest is a community-focused web platform that helps people discover local events, connect with their neighbors, and take part in activities that make their neighborhood stronger. Anyone can browse upcoming events, and signed-in members can create events, join others, and keep track of everything they have signed up for.

## Live Links

- **Live site:** [neighbor-nest-ph-b14-a08.vercel.app](https://neighbor-nest-ph-b14-a08.vercel.app/)
- **Server API:** [neighbor-nest-server-3tl3.vercel.app](https://neighbor-nest-server-3tl3.vercel.app/)
- **Client repository:** [NeighborNest-PH-B14-A08](https://github.com/md-ashraful-islam-ullas/NeighborNest-PH-B14-A08)
- **Server repository:** [NeighborNest-Server](https://github.com/md-ashraful-islam-ullas/NeighborNest-Server)

## Features

- Discover featured and upcoming community events in one place.
- Browse event details, including date, location, type, and description, without logging in.
- Create new neighborhood events with validated forms and a future-date check.
- Manage the events you host: update details or delete an event you created.
- Join events and view the activities you have signed up for, sorted by date.
- Sign up and sign in securely with email and password, or continue with Google.
- View and update your profile name and photo.
- Switch between light and dark themes at any time.
- Explore community stories and activities through the visual gallery.
- Subscribe to receive updates when new events become available.
- Get clear feedback on every action through toast messages and inline validation.

## Pages

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home: banner, featured events, gallery, and newsletter | Public |
| `/upcoming-events` | All upcoming events | Public |
| `/upcoming-events/[id]` | Event details and Join Event | Public to view, sign in to join |
| `/create-event` | Create a new event | Private |
| `/manage-event` | Update or delete your own events | Private |
| `/joined-events` | Events you have joined | Private |
| `/profile` | View and update your profile | Private |
| `/sign-in` | Log in | Public |
| `/sign-up` | Create an account | Public |

## Built With

**Client**

- [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [better-auth](https://www.better-auth.com/) for authentication
- [next-themes](https://github.com/pacocoursey/next-themes) for light and dark mode
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- [Lucide](https://lucide.dev/) for icons

**Server**

- Node.js and Express
- MongoDB
- JWT-protected API routes
- Deployed on Vercel

## Project Structure

```text
.
├── public/           # Logos, banner, and gallery images
└── src/
    ├── app/          # Routes and pages (App Router)
    ├── components/   # UI sections, event components, and shadcn/ui
    └── lib/          # Auth and API token helpers
```

## Getting Started

**Prerequisites:** Node.js 18 or newer and npm.

```bash
# 1. Clone the repository
git clone https://github.com/md-ashraful-islam-ullas/NeighborNest-PH-B14-A08.git
cd NeighborNest-PH-B14-A08

# 2. Install dependencies
npm install

# 3. Create .env.local and add your variables (see below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://neighbor-nest-server-3tl3.vercel.app

# Authentication (names depend on your better-auth setup)
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-connection-string
```

> Never commit `.env.local`. It is already ignored by `.gitignore`.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Check the code with ESLint |

## Deployment

The client and the server are both deployed on [Vercel](https://vercel.com/). Add the same environment variables in the Vercel project settings, and set `BETTER_AUTH_URL` to your live site URL.

## Author

Built by **Md. Ashraful Islam Ullas**.

- GitHub: [@md-ashraful-islam-ullas](https://github.com/md-ashraful-islam-ullas)