# Garazas.art Frontend

A Next.js-based frontend for the Garazas.art exhibition platform, featuring responsive design with Tailwind CSS and TypeScript integration.

## Features

- Responsive design for all device sizes
- Server-side rendering with Next.js 14
- Modern UI built with Tailwind CSS
- Type-safe code with TypeScript
- Optimized images and assets
- SEO best practices implemented

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/garazas.art.git
cd garazas.art/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create an `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

```
frontend/
├── public/             # Static assets
│   ├── images/         # Images and graphics
│   └── icons/          # Icon files
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── page.tsx    # Homepage
│   │   ├── layout.tsx  # Root layout
│   │   ├── open-call/  # Open Call page
│   │   ├── archive/    # Archive page
│   │   └── exhibition/ # Exhibition page
│   ├── components/     # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── layout/     # Layout components
│   │   ├── exhibition/ # Exhibition-related components
│   │   └── forms/      # Form components
│   └── lib/            # Utility functions and API clients
│       ├── api.ts      # API client
│       └── utils.ts    # Utility functions
├── .env.local          # Environment variables (create this file)
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Docker Support

A Dockerfile is provided to containerize the application:

```bash
docker build -t garazas-frontend .
docker run -p 3000:3000 garazas-frontend
```

## Environment Variables

The following environment variables can be used:

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | URL of the backend API | http://localhost:8000/api |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Please read the [CONTRIBUTING.md](../CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 