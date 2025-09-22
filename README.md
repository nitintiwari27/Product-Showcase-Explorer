# Product Showcase Explorer

A responsive Product Explorer that fetches products from the DummyJSON API and lets users browse, filter, sort, paginate and view detailed product information with polished animations (Framer Motion).

---

## Overview

On load the app fetches product data from the DummyJSON API and displays products in a responsive card grid. Users can filter by category, sort by price or title, paginate through results, and open a detailed product view. The app uses Framer Motion to animate list appearance, detail transitions and micro-interactions.

## Highlights

* Fetches products and categories from `https://dummyjson.com/products` and related endpoints.
* Responsive product grid with pagination.
* Product detail view showing description, rating, stock, brand, category and multiple images.
* Category filtering and client-side sorting (price A↔Z, title A↔Z).
* Loading and error states with friendly messages.
* Animations implemented using Framer Motion (staggered list animation, detail transition, hover micro-interactions).

## Features

* **Fetch & Display Products**: Fetches product list on initial load and displays product image, title and price on cards.
* **Pagination**: Uses limit & skip parameters from the API to paginate results.
* **Product Detail View**: Click a product to open a modal/detail view showing full details and multiple images.
* **Filtering**: Categories are fetched from the API and available as filter controls.
* **Sorting**: Client-side sorting by price (asc/desc) and title (A–Z / Z–A).
* **Loading/Error States**: Skeleton loaders / spinners while data fetches and user-friendly error messages.
* **Responsiveness**: Mobile-first responsive layout using Tailwind CSS.
* **Animations**: Framer Motion used for list appearance, detail transitions and micro-interactions.

## Tech Stack

* React (Vite)
* Redux Toolkit (state management)
* Tailwind CSS (styling)
* Framer Motion (animations)
* DummyJSON API (`https://dummyjson.com/`)
* Deployed on Vercel
* TypeScript / JavaScript (choose whichever branch/variant is present in the repo)

## Environment Variables

The app can be run against the public DummyJSON API by default. If you host a proxy or want to override the base API URL, set:

```
VITE_API_URL=https://dummyjson.com
```

If omitted, the app will fall back to `https://dummyjson.com`.


## Deployment

The frontend is configured for deployment on Vercel (static/site deployment). Ensure the following when deploying:

* Build command: `npm run build`
* Output directory: `dist`
* Optional environment variable `VITE_API_URL` set to your API or proxy URL.

## API Endpoints Used

* `GET /products` — list products (supports `limit` and `skip` query params)
* `GET /products/categories` — list categories
* `GET /products/category/{categoryName}` — products by category
* `GET /products/{id}` — product details

> The app fetches categories first (for filter UI), and then fetches products with pagination. Sorting is done client-side.


## Loading & Error Handling

* Loading skeletons are shown while API calls are in progress.
* If the API request fails, a friendly message is displayed with a retry button.


## Known Limitations & Notes

* Sorting is client-side and works best when fetching a sufficiently large page of products. For extremely large datasets, server-side sorting/pagination is recommended.
* The DummyJSON API is used for demo purposes and may have rate-limits or sample-only data.

## Live Demo

* Deployed on Vercel: `https://product-showcase-explorer-three.vercel.app/`

