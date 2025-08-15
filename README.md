# Onboarding Form Project

This project is a **Next.js client-side onboarding form** using **React Hook Form (RHF)** with **Zod** for validation. It fetches available services from an API and submits form data to an external endpoint using **Axios**.

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yasindudehan/client-onboarding-form-simple
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a file named `.env.local` in the root of the project with the following content:

```env
NEXT_PUBLIC_ONBOARD_URL=https://example.com/api/onboard
RETRIVE_SERVICES=https://example.com/api/services
```

**Note:**
- `NEXT_PUBLIC_ONBOARD_URL` → Endpoint to submit form data
- `RETRIVE_SERVICES` → Endpoint to fetch available services

Ensure that `.env.local` is added to `.gitignore` so it is not committed.

---

## Running the Project

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the onboarding form.

---

## Notes

- If the API for services fails, a default list is used: `["WEB DEVELOPMENT", "UI/UX", "AI", "CLOUD", "DEVOPS", "BACKEND"]`
- Form validation rules are enforced using **Zod**
- Success and error messages are displayed using popups
- Ensure the API endpoints in `.env.local` are reachable

---
