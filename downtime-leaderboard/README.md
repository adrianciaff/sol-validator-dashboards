# Validator Downtime Leaderboard

A clean, modern web application that displays validator downtime incidents in a nicely formatted table. The data is fetched from a live API and updates on page refresh.

## 🚀 Live Demo

Once deployed, your app will be available at: `https://<your-username>.github.io/internal-dashboards/`

## 📋 Features

- Real-time data from API endpoint
- Clean, responsive table design
- Mobile-friendly layout
- Automatic deployment via GitHub Actions
- Static site generation with Next.js

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd downtime-leaderboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

To create a production build:

```bash
npm run build
```

This will generate a static site in the `out/` directory.

## 🌐 Deployment to GitHub Pages

### Step 1: Push to GitHub

1. Create a new repository on GitHub or use this existing repository
2. Ensure your code is pushed to the `main` branch

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. Save the settings

### Step 3: Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Trigger on every push to the `main` branch
- Install dependencies
- Build the Next.js app
- Deploy to GitHub Pages

You can also manually trigger the deployment:
1. Go to **Actions** tab in your repository
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

### Step 4: Access Your Site

After the workflow completes (usually 1-2 minutes), your site will be live at:
```
https://<your-username>.github.io/internal-dashboards/
```

## 📊 Data Source

The application fetches data from:
```
https://api-service-321368118490.australia-southeast1.run.app/api/downtime-leaderboard
```

The API provides:
- Validator names
- Website URLs (if available)
- Number of incidents
- Metadata (total validators, time window, last updated date)

Data refreshes every time you reload the page.

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS (no external UI libraries)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
downtime-leaderboard/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page with table component
│   └── globals.css      # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 🔧 Configuration

### Base Path (if needed)

If your repository name is not "internal-dashboards", update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  images: {
    unoptimized: true,
  },
}
```

## 📝 License

This project is open source and available for anyone to use.

## 🤝 Contributing

Feel free to submit issues or pull requests if you'd like to improve the application.

