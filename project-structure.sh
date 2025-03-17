#!/bin/bash

# Create root project directories
mkdir -p garazas-art/{backend,frontend,docs}
mkdir -p garazas-art/backend/{app,tests}
mkdir -p garazas-art/backend/app/{api,core,models,services,utils}
mkdir -p garazas-art/backend/app/api/v1
mkdir -p garazas-art/backend/app/services/{google_sheets,archive}
mkdir -p garazas-art/frontend/{public,src}
mkdir -p garazas-art/frontend/src/{components,pages,styles,services,hooks,types,utils}
mkdir -p garazas-art/frontend/src/components/{layout,ui,forms,archive}
mkdir -p garazas-art/.github/workflows

# Create backend files
touch garazas-art/backend/requirements.txt
touch garazas-art/backend/Dockerfile
touch garazas-art/backend/.env.example
touch garazas-art/backend/main.py
touch garazas-art/backend/app/__init__.py
touch garazas-art/backend/app/core/__init__.py
touch garazas-art/backend/app/core/config.py
touch garazas-art/backend/app/api/__init__.py
touch garazas-art/backend/app/api/v1/__init__.py
touch garazas-art/backend/app/api/v1/endpoints.py
touch garazas-art/backend/app/models/__init__.py
touch garazas-art/backend/app/models/exhibition.py
touch garazas-art/backend/app/models/artist.py
touch garazas-art/backend/app/services/__init__.py
touch garazas-art/backend/app/services/google_sheets/__init__.py
touch garazas-art/backend/app/services/google_sheets/client.py
touch garazas-art/backend/app/services/archive/__init__.py
touch garazas-art/backend/app/services/archive/repository.py
touch garazas-art/backend/app/utils/__init__.py
touch garazas-art/backend/app/utils/validators.py

# Create frontend files
touch garazas-art/frontend/.env.local.example
touch garazas-art/frontend/Dockerfile
touch garazas-art/frontend/next.config.js
touch garazas-art/frontend/package.json
touch garazas-art/frontend/tsconfig.json
touch garazas-art/frontend/tailwind.config.js
touch garazas-art/frontend/postcss.config.js
touch garazas-art/frontend/src/pages/index.tsx
touch garazas-art/frontend/src/pages/_app.tsx
touch garazas-art/frontend/src/pages/archive.tsx
touch garazas-art/frontend/src/pages/open-call.tsx
touch garazas-art/frontend/src/components/layout/Header.tsx
touch garazas-art/frontend/src/components/layout/Footer.tsx
touch garazas-art/frontend/src/components/layout/Layout.tsx
touch garazas-art/frontend/src/components/forms/OpenCallForm.tsx
touch garazas-art/frontend/src/components/archive/ArchiveGrid.tsx
touch garazas-art/frontend/src/components/archive/ArchiveFilters.tsx
touch garazas-art/frontend/src/services/api.ts
touch garazas-art/frontend/src/styles/globals.css

# Create docker-compose and other config files
touch garazas-art/docker-compose.yml
touch garazas-art/.gitignore
touch garazas-art/README.md

# Create GitHub workflow file
touch garazas-art/.github/workflows/ci-cd.yml

# Create documentation files
touch garazas-art/docs/api.md
touch garazas-art/docs/architecture.md
touch garazas-art/docs/setup.md

echo "Project structure created successfully!" 