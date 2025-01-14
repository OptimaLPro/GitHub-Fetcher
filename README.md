# Zest Assignment

This project consists of two parts: a frontend application and a backend application. Together, they provide a platform to fetch, sort, and like GitHub repositories, with a focus on displaying repository data sorted by the most stars in descending order.

---

## **Frontend**

### Features

- **Dashboard Interface**: Displays repository data sorted by the repo with the most stars in descending order.
- **Sorting and Filtering**: Users can sort repositories by stars and filter their favorite repositories.
- **Favorites Management**: Save and manage favorite repositories.

### Getting Started

#### Prerequisites

- Node.js (v16 or higher) installed on your machine.
- npm (Node Package Manager).

#### Installation

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/OptimaLPro/GitHub-Fetcher-Zest.git
   cd GitHub-Fetcher-Zest
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

#### Running the Application

Start the development server:

```bash
npm run dev
```

The frontend application will run at `http://localhost:5173`.

### API Integration

Ensure the backend server is running before using the frontend application.

### Environment Setup

1. Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL="http://localhost:5000"
   ```

### Link to Backend repository
  ```
  https://github.com/OptimaLPro/GitHub-Fetcher-Backend-Zest
  ```
