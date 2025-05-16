# 🛍️ Product Catalog with Filtering

A responsive product catalog web application built with Next.js 15, featuring dynamic filtering capabilities.

**Live Demo:** [product-catalog-with-filtering.vercel.app](https://product-catalog-with-filtering.vercel.app)

---

## 🚀 Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ariqd/product-catalog-with-filtering.git
   cd product-catalog-with-filtering
   ```



2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```



3. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```



4. **Open in Browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Architecture Decisions

* **Framework:** Utilizes [Next.js 15](https://nextjs.org/) for server-side rendering and optimized performance.
* **TypeScript:** Ensures type safety and improved developer experience.
* **Styling:** Employs [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and rapid UI development.
* **State Management:** Implements [Zustand](https://github.com/pmndrs/zustand) for lightweight and scalable state management.
* **Project Structure:**

  * `app/`: Contains Next.js pages and routing.
  * `components/`: Reusable UI components.
  * `lib/`: Utility functions and API interactions.
  * `public/`: Static assets.
  * `__tests__/`: Unit and integration tests.

---

## 🧠 State Management Explanation

* **Zustand Store:**

  * Manages global state for products, filters, and cart functionalities.
  * Provides actions to update filters and manage cart items.
  * Ensures a predictable and centralized state management approach.

* **Local State:**

  * Handles UI-specific states, such as modal visibility and input values, within individual components.
  * Handled cart storage using localStorage

---

## ⚡ Performance Notes

* **Image Optimization:**

  * Leverages Next.js's `Image` component for automatic image optimization and lazy loading.

* **Code Splitting:**

  * Next.js automatically splits code to improve load times and performance.

* **Filtering Efficiency:**

  * Filters are applied client-side with optimized algorithms to ensure swift user interactions.

* **Responsive Design:**

  * Tailwind CSS ensures the application is responsive across various devices and screen sizes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
