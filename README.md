<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Onboarding Form Project - Instructions</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; background-color: #f9f9f9; }
    h1, h2 { color: #2c3e50; }
    pre { background: #ecf0f1; padding: 10px; border-radius: 5px; overflow-x: auto; }
    code { color: #c0392b; }
    section { margin-bottom: 30px; }
  </style>
</head>
<body>
  <h1>Onboarding Form Project</h1>

  <p>This project is a <strong>Next.js client-side onboarding form</strong> using <strong>React Hook Form (RHF)</strong> with <strong>Zod</strong> for validation. It fetches available services from an API and submits form data to an external endpoint using <strong>Axios</strong>.</p>

  <section>
    <h2>Setup</h2>

    <h3>1. Clone the Repository</h3>
    <pre><code>git clone &lt;YOUR_REPO_URL&gt;
cd &lt;YOUR_REPO_FOLDER&gt;</code></pre>

    <h3>2. Install Dependencies</h3>
    <pre><code>npm install</code></pre>

    <h3>3. Create Environment File</h3>
    <p>Create a file named <code>.env.local</code> in the root of the project with the following content:</p>
    <pre><code>NEXT_PUBLIC_ONBOARD_URL=https://example.com/api/onboard
RETRIVE_SERVICES=https://example.com/api/services</code></pre>
    <p>
      <strong>Note:</strong>  
      <ul>
        <li><code>NEXT_PUBLIC_ONBOARD_URL</code> → Endpoint to submit form data</li>
        <li><code>RETRIVE_SERVICES</code> → Endpoint to fetch available services</li>
      </ul>
      Ensure that <code>.env.local</code> is added to <code>.gitignore</code> so it is not committed.
    </p>
  </section>

  <section>
    <h2>Running the Project</h2>
    <pre><code>npm run dev</code></pre>
    <p>Then open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser to see the onboarding form.</p>
  </section>

  <section>
    <h2>Notes</h2>
    <ul>
      <li>If the API for services fails, a default list is used: <code>["WEB DEVELOPMENT", "UI/UX", "AI", "CLOUD", "DEVOPS", "BACKEND"]</code></li>
      <li>Form validation rules are enforced using <strong>Zod</strong></li>
      <li>Success and error messages are displayed using popups</li>
      <li>Ensure the API endpoints in <code>.env.local</code> are reachable</li>
    </ul>
  </section>
</body>
</html>
