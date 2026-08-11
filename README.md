# PizzaFlow

PizzaFlow is a full-stack pizza delivery application. Customers can browse the menu, build a pizza, place orders, pay, and track delivery. Administrators can manage products and fitted product images, banners, inventory, customers, orders, coupons, delivery fees, and reports.

The project contains:

- React + Vite frontend
- Express + Node.js backend
- MongoDB + Mongoose database support
- JWT authentication with customer, admin, and rider roles
- In-memory fallback mode for quick local testing

## 1. Requirements

Install these before starting:

- Node.js 18 or newer
- npm
- MongoDB Atlas or a local MongoDB server (optional for temporary in-memory mode)
- A Gmail account with an App Password (required for email verification)

## 2. Project folders

```text
WebDev-L3-PizzaDeliveryApp/
├── client/                 React frontend
├── server/                 Express backend
├── images/                 Project image assets
├── package.json            Root workspace commands
└── README.md
```

## 3. Install the project

Open a terminal in the project folder:

```bash
npm install
```

The root `package.json` installs dependencies for both the `client` and `server` workspaces.

## 4. Configure the backend

Create `server/.env` by copying the example file:

```bash
cp server/.env.example server/.env
```

Then edit `server/.env`:

```env
PORT=4000
MONGO_URI=mongodb+srv://db_user:db_password@cluster.mongodb.net/pizzaflow?retryWrites=true&w=majority
JWT_SECRET=replace-this-with-a-long-random-secret
SEED_DEMO_DATA=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-character-gmail-app-password
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### What the variables mean

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the API. The default is `4000`. |
| `MONGO_URI` | MongoDB connection string. Leave it empty to use temporary in-memory data. |
| `JWT_SECRET` | Secret used to sign login tokens. Change it for real deployments. |
| `SEED_DEMO_DATA` | Set to `true` to add demo products, orders, inventory, banners, and users to an empty database. |
| `EMAIL_USER` | Gmail address used to send verification codes. |
| `EMAIL_APP_PASSWORD` | Gmail App Password. Do not use the normal Gmail password. |
| `CLIENT_URL` | Frontend URL used in password reset links. |
| `RAZORPAY_KEY_ID` | Razorpay test-mode public key. |
| `RAZORPAY_KEY_SECRET` | Razorpay test-mode secret used by the backend. |
| `RAZORPAY_WEBHOOK_SECRET` | Secret used to verify Razorpay webhooks. |

The server will start without MongoDB, but the in-memory data is lost whenever the server restarts. Use MongoDB when you want products, users, and orders to remain saved.

## 5. Configure the frontend

Create `client/.env`:

```bash
cp client/.env.example client/.env
```

The default value is normally enough:

```env
VITE_API_BASE_URL=http://localhost:4000
```

If the backend runs on another address, change this URL and restart the frontend.

## 6. Start the application

Run both frontend and backend together:

```bash
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

The backend API runs at:

```text
http://localhost:4000
```

Useful commands:

```bash
npm run build       # Create a production frontend build
npm run lint        # Run the configured lint commands
npm run start       # Start only the backend
```

To run each part separately:

```bash
npm run dev --workspace server
npm run dev --workspace client
```

## 7. Create the first administrator

1. Start the application.
2. Open `http://localhost:5173/setup-admin`.
3. Enter the administrator name, email, and password.
4. Use a password with at least 8 characters and one number.
5. Enter the verification code sent to the email address.
6. Open the admin dashboard at `http://localhost:5173/admin`.

After the first admin exists, the setup endpoint will not create another admin. Use `/admin/login` for future admin logins.

Email must be configured for registration, admin setup, and login verification. For Gmail, enable two-step verification and create an App Password under Google Account security settings.

## 8. Customer features

Customers can use these pages:

| Page | URL | Description |
|---|---|---|
| Home | `/` | Homepage, promotions, and featured products |
| Menu | `/menu` | Browse, search, and filter available products |
| Register | `/register` | Create a customer account |
| Login | `/login` | Customer login with email verification |
| Pizza builder | `/builder` | Select base, sauce, cheese, vegetables, and quantity |
| Cart | `/cart` | Review items before ordering |
| Orders | `/orders` | View previous orders |
| Track order | `/track` | Follow order status |
| Profile | `/profile` | View the customer profile |

The builder, cart, checkout, orders, tracking, and profile pages require a customer login.

## 9. Admin features

Admin pages are protected and require an account with the `admin` role:

| Page | URL | Description |
|---|---|---|
| Dashboard | `/admin` | Overview of the store |
| Orders | `/admin/orders` | View and update customer orders |
| Inventory | `/admin/inventory` | Update stock and see low-stock items |
| Products | `/admin/products` | Create, edit, and delete menu products |
| Banners | `/admin/banners` | Manage homepage promotions |
| Customers | `/admin/customers` | View customer information |
| Coupons | `/admin/coupons` | View coupon data |
| Delivery fees | `/admin/delivery-fees` | View delivery fee settings |
| Reports | `/admin/reports` | View sales and business reports |
| Settings | `/admin/settings` | View admin settings |

### Managing products and images

Go to `/admin/products` to add a pizza, snack, chips, drink, dessert, or any other menu item.

For each product, enter:

- Name
- Description
- Category
- Ingredients
- Price
- Size and crust
- Availability
- One clear image URL, or one uploaded image

The image is fitted into the menu card with a cover crop so it fills the image area without stretched distortion or empty white space. Existing products with only `imageUrl` continue to work.

The builder includes soft drinks, Italian citrus sodas, iced tea, lemonades, juices, water, kombucha, beer styles, and wine styles. Alcoholic selections require legal-drinking-age confirmation at checkout.

Every product stores the admin email that created it and the admin email that last updated it. Only authenticated admins can create, update, or delete products.

Uploaded product images are sent as data URLs and are limited by the backend JSON limit. For larger images or production use, image hosting such as Cloudinary, S3, or another media service is recommended.

## 10. Rider features

Riders use:

```text
/rider/login
/rider
```

The rider role can view assigned delivery work and update delivery statuses.

## 11. Backend API overview

All API endpoints begin with `http://localhost:4000/api`.

### Public endpoints

```text
GET  /health
GET  /products
GET  /banners
GET  /pizzas/options
GET  /pizzas/bases
GET  /pizzas/sauces
GET  /pizzas/cheeses
GET  /pizzas/vegetables
```

### Authentication endpoints

```text
POST /auth/register
POST /auth/setup-admin
POST /auth/login
POST /auth/verify-email
POST /auth/resend-code
POST /auth/forgot-password
POST /auth/reset-password
```

### Forgot password flow

1. Open `/forgot-password`.
2. Enter the account email address.
3. Open the secure reset link sent to the real email inbox.
4. Choose and confirm a new password at `/reset-password`.
5. Return to `/login` and sign in with the new password.

Reset tokens are hashed in the database, expire after 10 minutes, and are deleted after a successful password change. The email sender uses `EMAIL_USER` and `EMAIL_APP_PASSWORD` from `server/.env`.

### Real-time order tracking

The customer dashboard and tracking page connect to the authenticated order event stream. When an admin changes an order status, the customer’s order and tracking status refresh without waiting for a page reload.

### Razorpay test payments

Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` from a Razorpay test-mode account. The backend creates real Razorpay test orders with the SDK, the frontend opens Razorpay Checkout, and the backend verifies the returned signature. If the keys are not configured, local development uses the built-in demo fallback.

### Admin product endpoints

```text
POST   /products       Create a product
PATCH  /products/:id   Update a product
DELETE /products/:id  Delete a product
```

These endpoints require a valid JWT token and the `admin` role.

### Other protected endpoints

```text
POST  /orders
GET   /orders/my-orders
GET   /orders/admin/all
PATCH /orders/:id/status

GET   /inventory
GET   /inventory/low-stock
PATCH /inventory/:itemId

POST  /payments/create-order
POST  /payments/verify
```

The frontend automatically sends the JWT token after login.

## 12. MongoDB Atlas setup

1. Create a free MongoDB Atlas cluster.
2. Create a database user under `Database Access`.
3. Add your IP address under `Network Access`.
4. Select `Connect` and choose `Drivers`.
5. Copy the MongoDB connection string.
6. Replace the username, password, and database name.
7. Paste the result into `server/.env` as `MONGO_URI`.
8. Restart the backend.

Example:

```env
MONGO_URI=mongodb+srv://pizza_admin:YOUR_PASSWORD@cluster0.example.mongodb.net/pizzaflow?retryWrites=true&w=majority
```

MongoDB Compass can connect to the same URI so you can inspect users, products, orders, banners, and inventory.

## 13. Demo data

To automatically add demo data to an empty MongoDB database:

```env
SEED_DEMO_DATA=true
```

Restart the backend after changing the setting. For a clean real application, use:

```env
SEED_DEMO_DATA=false
```

Then create the first admin and add real products from the dashboard.

## 14. Troubleshooting

### The frontend cannot reach the server

Check that the backend is running on port `4000` and that `client/.env` contains:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Restart Vite after changing an environment file.

### MongoDB connection failed

Check the username, password, database name, IP allowlist, and `MONGO_URI`. The app can still run in temporary in-memory mode, but data will not survive a restart.

### Verification email was not sent

Check `EMAIL_USER` and `EMAIL_APP_PASSWORD`. Gmail requires two-step verification and an App Password.

### Admin page redirects to login

Log in through `/admin/login` and verify that the account has the `admin` role. Customer accounts cannot open admin pages.

### Product images are not showing

Use a valid public image URL, or upload a smaller image. The server accepts JSON requests up to 8 MB.

## 15. Production notes

Before deploying:

- Use a strong unique `JWT_SECRET`.
- Use MongoDB instead of the in-memory store.
- Keep `.env` files private and never commit passwords or tokens.
- Use hosted image storage instead of large base64 image data.
- Configure real payment credentials and verify payment webhooks.
- Set the frontend API URL to the deployed backend URL.

## 16. Internship submission

If this project is submitted to an Oasis Infobyte repository, keep the project inside the required folder, for example:

```text
OIBSIP/WebDev-L3-PizzaDeliveryApp/
```

Include the source code, README, screenshots, and any required demo assets.
