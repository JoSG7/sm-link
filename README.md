# SmLink --- URL Manager & Smart Link Platform

**Shorten, protect and manage your URLs easily and safely**

SmLink is a modern platform to efficiently URL management.
It allows shortening long URLs, protecting them with passwords, and setting expiration dates.

------------------------------------------------------------------------

## Main Features

### URLs Management

-   Create custom short URLs or generate them automatically
-   View URL details: original URL, creation date, status
-   Delete short URLs easily 

### Protected URLs

-   Add a password to the URL
-   Secure validation in the database using hashing with `crypt()`
-   Access the original URL only after validating credentials

### URL Expirations

-   Define an expiration date
-   Automatically block the URL upon expiration

------------------------------------------------------------------------

## Project Architecture

### Backend

-   Next.js 16 (App Router)
-   Supabase (DB + Auth + Storage + RPC)
-   Security with HTTPOnly cookies and RLS
-   RPC Functions focused on security and performance

### Frontend

-   React + Tailwind CSS
-   Animations with Framer Motion
-   Custom Hooks and responsive UI

------------------------------------------------------------------------

## Project Structure

      app/
        [shortUrl]/
        api/
        auth/
        dashboard/
        favicon.ico
        globals.css
        layout.tsx
        page.tsx
      config/
      features/
        dashboard/
        home/
          components/
          hero-section/
          hooks/
          layout/
          modals/
          services/
          shared/
      lib/
        supabase/
        utils.ts
      store/
        link-changes-slice.ts
        modal-slice.ts
        ReduxProvider.tsx
        store-config.ts

------------------------------------------------------------------------

## Installation

  ```bash
    git clone https://github.com/JoSG7/sm-link.git
    cd sm-link
    npm install
    npm run dev
  ```

## Environment Variables
  ```env
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE_KEY=
  ```

------------------------------------------------------------------------

## Future Improvements

- Advanced metrics dashboard  
- UI for editing expirations (users only)  
- Enhanced animations

------------------------------------------------------------------------

## Author

**JGDev (JoSG7)** --- Fullstack Developer
