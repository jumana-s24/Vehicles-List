# **A Next.js Vehicle Listing App**

A user-friendly platform for browsing and discovering electric vehicles. Built with **Next.js, TypeScript, Tailwind CSS, and React Query**.

## **Tech Stack**

- **Framework:** Next.js 15.1.6

- **Styling:** Tailwind CSS

- **Data Fetching:** React Query + Server Components

- **State Management:** useState

- **Testing:** Jest & React Testing Library

- **Build & Deployment:** Docker

## **Features**

- **Vehicle Listing with Search, Filtering & Sorting.**

- **Server-Side Rendering (SSR) for Initial Page Load.**

- **Client-Side Pagination for Smooth User Experience.**

- **Optimized Data Fetching with React Query (Caching & Prefetching).**

- **Skeleton Loaders & Lazy Loading for Performance Boost.**

- **Accessibility (ARIA Labels, Keyboard Navigation, Screen Reader Support).**

- **Unit Test.**

## **Design Decisions & Code Comments**

### **Server-Side Rendering (SSR)**

Home page fetches the initial data using `fetchVehicles(1);` inside the `Home` component before rendering the page.

#### **Benefits**

- **SEO Improvement**: Since the initial data is fetched before rendering, search engines can index the page with the first batch of vehicles.
- **Faster Initial Load**: The user sees the first set of vehicles immediately without waiting for client-side fetching.

### **Pagination with React Query**

Implemented client-side pagination using `usePaginatedVehicles` and React Query’s caching.

#### **Benefits**

- **Efficient Data Fetching**: Fetches only the required page of vehicles, reducing the API load.
- **Automatic Caching & Refetching**: React Query caches API responses, minimizing redundant network requests.

#### **Trade-offs**

- **Larger Client-side Bundle**: React Query introduces additional client-side logic, increasing JS size.

### **Pagination with React Query**

- **Search**: Uses a text input that updates the query state (`search`).
- **Filter**: Allows filtering by **New/Used** condition.
- **Sorting**: Provides options to sort by **price** (asc/desc) and **year** (asc/desc).
- Uses **`useDebounce(search, 500)`** to reduce API calls when typing in the search input.

#### **Benefits**

- **Server-side Search & Filtering**: Instead of filtering on the client, the backend API handles search, filters, and sorting efficiently.
- **Debounced Search**: Prevents excessive API calls while the user types.
- **React Query Optimizations**: Ensures that sorting and filtering updates only fetch relevant data.

#### **Trade-offs**

- **Increased Backend Load**: Since filtering and sorting are done server-side, the backend must handle multiple query parameters efficiently.
- **Potential Latency**: If the API response is slow, users might experience a slight delay in updated search results.

## Getting Started

Follow these steps to set up and run the project locally.

### **Clone the Repository**

```bash

git  clone  https://github.com/yourname/electric-vehicles.git

cd  electric-vehicles

```

### **Install Dependencies**

```bash

npm  install

```

### **Run the App Locally**

```bash

npm  run  dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash

npm  test

```

## Running with Docker

### **Build The Docker Image**

```bash

docker  build  -t  electric-vehicles  .

```

### **Run the Docker Container**

```bash

docker  run  -p  3000:3000  electric-vehicles

```

Open [http://localhost:3000](http://localhost:3000) in your browser.
