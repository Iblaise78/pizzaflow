# PizzaFlow Deployment

This project is ready for a simple production setup:

- Frontend: Vercel
- Backend API: Render
- Database: MongoDB Atlas

## 1. Prepare MongoDB Atlas

1. Create or open a MongoDB Atlas cluster.
2. Create a database user in Database Access.
3. In Network Access, allow Render to connect. For a student/demo deployment, `0.0.0.0/0` is the easiest option.
4. Copy the driver connection string.
5. Use a database name such as `pizzaflow`.

Example:

```env
MONGO_URI=mongodb+srv://pizza_admin:YOUR_PASSWORD@cluster0.example.mongodb.net/pizzaflow?retryWrites=true&w=majority
```

## 2. Deploy The Backend On Render

1. Push this project to GitHub.
2. In Render, create a new Web Service from the repository.
3. Use these settings:

```text
Root Directory: server
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

4. Add these environment variables:

```env
NODE_ENV=production
PORT=4000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_secret
CLIENT_URL=https://your-vercel-site.vercel.app
SEED_DEMO_DATA=true
EMAIL_USER=yourgmail@gmail.com
EMAIL_APP_PASSWORD=your_google_app_password
RAZORPAY_KEY_ID=optional_test_key
RAZORPAY_KEY_SECRET=optional_test_secret
RAZORPAY_WEBHOOK_SECRET=optional_webhook_secret
```

If you do not have Gmail App Passwords yet, leave the email values blank during the first deploy. The app will still show development verification codes when email is not configured.

## 3. Deploy The Frontend On Vercel

1. Import the same GitHub repository in Vercel.
2. Keep the project root as the repository root. The included `vercel.json` handles the client build.
3. Add this environment variable:

```env
VITE_API_BASE_URL=https://your-render-api.onrender.com
```

4. Deploy.

The included `vercel.json` also fixes refresh/navigation for React routes like `/menu`, `/cart`, `/admin/login`, and `/admin/products`.

## 4. Connect The Two URLs

After Vercel gives you the final frontend URL, return to Render and update:

```env
CLIENT_URL=https://your-vercel-site.vercel.app
```

For multiple frontend URLs, separate them with commas:

```env
CLIENT_URL=https://your-vercel-site.vercel.app,https://your-preview-url.vercel.app
```

Redeploy or restart the Render service after changing environment variables.

## 5. First Production Check

Open these URLs:

```text
https://your-render-api.onrender.com/api/health
https://your-vercel-site.vercel.app
```

Then create the first admin:

```text
https://your-vercel-site.vercel.app/setup-admin
```

After verification, go to:

```text
https://your-vercel-site.vercel.app/admin/products
```

From there you can update pizzas, drinks, images, prices, and availability like the real admin.

## Troubleshooting

- If products do not save, check `MONGO_URI` and Atlas Network Access.
- If the frontend says requests failed, check `VITE_API_BASE_URL` in Vercel.
- If the browser shows a CORS error, check `CLIENT_URL` in Render.
- If login verification email does not arrive, check `EMAIL_USER` and `EMAIL_APP_PASSWORD`.
- If images are too large when uploaded, use public image URLs or smaller files.
