# 🌟 Care Service – A Comprehensive Care Management Platform

## 🎯 Project Purpose
Care Service is a comprehensive web application designed to bridge the gap between care service providers and families who need professional caregiving support.  
It provides a platform where users can discover trusted care services, manage bookings seamlessly, and connect with verified caregivers for children, elderly, and those needing special attention.  
The platform emphasizes a clean user experience, secure transactions, and efficient management tools.

---

### 🔗 [🌐 Live Link](https://care-service-assignment-12.vercel.app/)

## 🗝 Key Features

✅ **Robust User Authentication**
- Secure Login, Signup, and Google Sign-in powered by **Firebase**.
- **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Admins** and **Users**.
- Secured Private Routes to protect sensitive pages.
- Password visibility toggle for enhanced user experience.
- Profile image updates with instant display (no refresh needed).

✅ **Dashboard & Management (Private Routes)**
- **User Dashboard:** View booking history, manage profile, and track service requests.
- **Admin Dashboard:** Oversee all users, manage bookings, and control platform-wide settings.
- **Profile Management:** Update user details including profile pictures with real-time preview.

✅ **Service Discovery & Booking**
- **Home Page:** Showcase of available care services with attractive cards displaying service details.
- **Services Page:** Browse all available care services with detailed information.
- **Service Details:** In-depth view of individual service offerings with booking options.
- **Seamless Booking Process:** Easy-to-use booking system with form validation.

✅ **Secure Payments**
- Integrated **Stripe** payment gateway for safe and reliable transactions.
- Dual payment flow: Payment intent and checkout session options.
- Order status updates upon successful payment.
- Payment success page with booking confirmation.

✅ **Booking Management**
- **My Bookings:** View all personal bookings with status tracking.
- **Admin Booking Management:** Comprehensive booking oversight for administrators.
- Real-time booking status updates.

✅ **Responsive Design & Modern UI**
- Fully responsive layout optimized for mobile, tablet, and desktop.
- Built with **Next.js 16**, **Tailwind CSS**, and **DaisyUI** for a modern, clean aesthetic.
- Enhanced Hero section with gradient backgrounds and statistics.
- Interactive elements like Image Previews, Modals, and Toast Notifications (SweetAlert2).
- Beautiful About section with mission statement and key features.
- Testimonials section with ratings and client feedback.

✅ **Database Seeding**
- Easy database seeding functionality via API route.
- Pre-populated service data for quick setup and testing.

---

## 👥 User Roles

### 👑 Admin
- **Manage Users:** View all users and update their roles.
- **Manage Bookings:** Oversee all bookings across the platform.
- **Platform Oversight:** Monitor system-wide activities and user engagement.
- **Exclusive Access:** Dedicated admin routes for comprehensive management.

### 🛒 User
- **Service Discovery:** Browse care services and view detailed information.
- **Booking Services:** Book services seamlessly with secure payment.
- **Profile Management:** Update personal information and profile picture.
- **Booking History:** View past and current bookings with status tracking.
- **Secure Checkout:** Purchase services securely using Stripe.

---

## 📦 NPM Packages Used
| Package | Purpose |
|---------|---------|
| next | Next.js 16 - React Framework |
| react | Core React library v19 |
| firebase | Authentication & User Management |
| mongodb | Database for storing users, services & bookings |
| axios | HTTP Client for API calls |
| react-hook-form | Form handling & Validation |
| stripe / @stripe/stripe-js | Payment Processing |
| @stripe/react-stripe-js | Stripe React Components |
| tailwindcss | Styling framework v4 |
| daisyui | UI Component library |
| sweetalert2 | Beautiful Popups & Notifications |
| react-icons | Modern Icons |
| localforage | Client-side storage |
| match-sorter | Utility for filtering and sorting |

---

## 🧩 Tools & Technologies
- **Frontend:** Next.js 16 + React 19
- **Styling:** TailwindCSS 4 + DaisyUI
- **Auth:** Firebase Authentication (Email/Password + Google OAuth)
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MongoDB
- **Payment:** Stripe API (Payment Intent & Checkout Session)
- **Image Upload:** Cloudinary (for profile pictures)
- **State Management:** Context API (AuthProvider)
- **Form Validation:** React Hook Form
- **Deployment Ready:** Optimized for Vercel/Netlify deployment

---

## 🎨 Design Highlights

### Enhanced Hero Section
- **Gradient Background:** Beautiful gradient overlay with blur effects
- **Trust Badge:** "Trusted by 1000+ Families" badge for credibility
- **Statistics Display:** 
  - 500+ Verified Caregivers
  - 5,000+ Successful Bookings
  - 4.9 Average Rating
- **Dual CTA Buttons:** "Find Care Services" and "Join as Provider"

### About Section
- Mission statement with visual imagery
- Key features list:
  - Background Verified Caregivers
  - Secure Booking Process
  - Real-time Updates
  - Affordable Rates

### Testimonials
- Client reviews with 5-star ratings
- Avatar placeholders with client initials
- Professional designations displayed

---

## ⚙️ Run Locally

### Prerequisites
- Node.js 18+ installed
- MongoDB account (Atlas or local)
- Firebase project setup
- Stripe account
- Cloudinary account (for image uploads)

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/care-service-assignment-12.git

# 2. Navigate to project directory
cd care-service-assignment-12

# 3. Install dependencies
npm install

# 4. Configure Environment Variables
# Create a .env.local file in the root directory with the following variables:

MONGODB_URI=your_mongodb_connection_string
DB_NAME=care_service

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# 5. Seed the database (optional but recommended)
# Navigate to http://localhost:3000/api/seed in your browser
# or use curl:
curl http://localhost:3000/api/seed

# 6. Run the development server
npm run dev

# 7. Open your browser
# Navigate to http://localhost:3000
```

---

## 🚀 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
care-service-assignment-12/
├── app/
│   ├── api/                    # API Routes
│   │   ├── admin/             # Admin-related endpoints
│   │   ├── bookings/          # Booking CRUD operations
│   │   ├── create-checkout-session/ # Stripe checkout
│   │   ├── create-payment-intent/   # Stripe payment intent
│   │   ├── payment/           # Payment processing
│   │   ├── seed/              # Database seeding
│   │   ├── services/          # Service CRUD operations
│   │   └── users/             # User management
│   ├── booking/               # Booking page
│   ├── dashboard/             # Dashboard layout & pages
│   │   ├── all-users/         # User management (Admin)
│   │   └── bookings/          # Booking management (Admin)
│   ├── login/                 # Login page
│   ├── my-bookings/           # User's booking history
│   ├── payment/               # Payment pages
│   ├── profile/               # User profile page
│   ├── register/              # Registration page
│   ├── service/               # Individual service details
│   ├── services/              # All services listing
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout with providers
│   ├── page.js                # Home page
│   └── not-found.js           # 404 page
├── components/
│   ├── CheckoutForm.jsx       # Stripe checkout form
│   ├── Footer.jsx             # Footer component
│   └── Navbar.jsx             # Navigation bar
├── lib/
│   └── connectDB.js           # MongoDB connection utility
├── providers/
│   └── AuthProvider.jsx       # Firebase auth context
├── public/
│   └── assets/                # Static assets (images, etc.)
├── .env.local                 # Environment variables (gitignored)
├── next.config.mjs            # Next.js configuration
├── tailwind.config.mjs        # Tailwind CSS configuration
└── package.json               # Project dependencies
```

---

## 🔐 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `DB_NAME` | MongoDB database name | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | ✅ Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe Secret Key | ✅ Yes |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | ✅ Yes |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary Upload Preset | ✅ Yes |

---

## 🌟 Key Features Breakdown

### Authentication System
- **Email/Password Registration** with profile image upload
- **Google OAuth** integration for quick sign-up
- **Profile Management** with image preview and circular styling
- **Session Persistence** across page refreshes
- **Secure Password** handling with visibility toggle

### Booking System
- **Service Selection** from homepage or services page
- **Booking Form** with validation using React Hook Form
- **Date Selection** for service scheduling
- **Instant Booking** confirmation
- **Status Tracking** (Pending, Confirmed, Completed, Cancelled)

### Payment Integration
- **Dual Payment Options:**
  - Payment Intent for direct payments
  - Checkout Session for hosted checkout
- **Secure Processing** via Stripe
- **Payment Confirmation** page
- **Transaction History** in user dashboard

### Admin Panel
- **User Management** with role updates
- **Booking Oversight** with status management
- **Platform Statistics** and analytics
- **Service Management** capabilities

---

## 🎯 Future Enhancements
- [ ] Real-time chat between users and caregivers
- [ ] Advanced search filters (location, price, ratings)
- [ ] Caregiver profiles with detailed information
- [ ] Review and rating system for services
- [ ] Email notifications for bookings
- [ ] Calendar integration for scheduling
- [ ] Multi-language support
- [ ] Mobile app version

---

## 👨‍💻 Developer
**Fardin Sojon**
- Email: fardinsojon@gmail.com
- GitHub: [@fardin-sojon](https://github.com/fardin-sojon)

---

## 🙏 Acknowledgments
- **Programming Hero** for the project assignment
- **Next.js Team** for the amazing framework
- **Firebase** for authentication services
- **Stripe** for payment processing
- **MongoDB** for database solutions
- **DaisyUI** for beautiful UI components

---

## 📞 Support
For support, email fardinsojon@gmail.com or create an issue in the GitHub repository.

---

Made with ❤️ by Fardin Rahman Sojon
