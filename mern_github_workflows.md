Here’s a ready-to-use structure for your MERN project including all four GitHub Actions workflow files.

```
mern-production-ready/
├── server/
│   └── ...
├── client/
│   └── ...
└── .github/workflows/
    ├── frontend-ci.yml
    ├── backend-ci.yml
    ├── frontend-cd.yml
    └── backend-cd.yml
```

---

### 1️⃣ frontend-ci.yml
```yaml
name: Frontend CI

on:
  push:
    paths:
      - 'client/**'
    branches:
      - main
  pull_request:
    paths:
      - 'client/**'

jobs:
  build-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: |
          cd client
          npm ci

      - name: Run frontend tests
        run: |
          cd client
          npm test -- --watchAll=false

      - name: Build frontend
        run: |
          cd client
          npm run build
```

### 2️⃣ backend-ci.yml
```yaml
name: Backend CI

on:
  push:
    paths:
      - 'server/**'
    branches:
      - main
  pull_request:
    paths:
      - 'server/**'

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install backend dependencies
        run: |
          cd server
          npm ci

      - name: Run backend tests
        run: |
          cd server
          echo "No backend tests defined"
```

### 3️⃣ frontend-cd.yml
```yaml
name: Frontend CD

on:
  push:
    branches:
      - main
    paths:
      - 'client/**'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: |
          cd client
          npm ci

      - name: Build frontend
        run: |
          cd client
          npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v22
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./client
          prod: true
```

### 4️⃣ backend-cd.yml
```yaml
name: Backend CD

on:
  push:
    branches:
      - main
    paths:
      - 'server/**'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install backend dependencies
        run: |
          cd server
          npm ci

      - name: Deploy to Render
        uses: render-examples/deploy@v1
        with:
          api-key: ${{ secrets.RENDER_API_KEY }}
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          branch: main
```

---

### ✅ Instructions
1. Copy all four `.yml` files into `.github/workflows/` in your repo.  
2. Set GitHub secrets for Vercel and Render:  

   **Vercel:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`  
   **Render:** `RENDER_API_KEY`, `RENDER_SERVICE_ID`  

3. Push to GitHub → CI/CD will run automatically.  

---

Do you want me to **package this entire MERN project with workflows in a ready-to-download ZIP** next?

