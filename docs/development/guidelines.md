# Development Guidelines

This document outlines the development guidelines, coding standards, and best practices for contributing to the Garazas.art project.

## Table of Contents

- [Code Organization](#code-organization)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)

## Code Organization

### Frontend Structure

The frontend code is organized as follows:

```
frontend/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js 14 app directory (pages)
│   ├── components/   # React components
│   │   ├── common/   # Common components (buttons, inputs, etc.)
│   │   ├── layout/   # Layout components (header, footer, etc.)
│   │   ├── forms/    # Form components
│   │   └── ui/       # UI components (cards, modals, etc.)
│   ├── lib/          # Utilities and helpers
│   │   ├── api/      # API services
│   │   ├── context/  # React context providers
│   │   ├── hooks/    # Custom React hooks
│   │   └── utils/    # Utility functions
│   └── types/        # TypeScript type definitions
└── tests/            # Test files
```

### Backend Structure

The backend code is organized as follows:

```
backend/
├── app/
│   ├── api/          # API endpoints
│   ├── models/       # Data models (Pydantic)
│   ├── services/     # Business logic
│   └── tests/        # Test files
├── credentials/      # API credentials (not tracked in Git)
└── data/             # Data storage
```

## Coding Standards

### General Guidelines

- Use descriptive variable and function names
- Keep functions small and focused on a single task
- Comment complex logic and include documentation strings
- Follow the DRY principle (Don't Repeat Yourself)
- Write code that is easy to test

### Frontend Standards

- **TypeScript**: Use strong typing and avoid `any` types where possible
- **React Hooks**: Prefer functional components with hooks over class components
- **CSS/Styling**: Use Tailwind CSS utility classes, avoiding custom CSS when possible
- **State Management**: Use React Context and hooks for state management
- **Formatting**: The codebase uses Prettier with 2-space indentation

Example React component:

```tsx
import React from 'react';
import { useExhibition } from '@/lib/hooks/useExhibition';
import { Exhibition } from '@/lib/types/models';

interface ExhibitionCardProps {
  exhibitionId: string;
  showDetails?: boolean;
}

export const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ 
  exhibitionId, 
  showDetails = true 
}) => {
  const { exhibition, loading, error } = useExhibition(exhibitionId);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!exhibition) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{exhibition.title}</h3>
      {showDetails && (
        <p className="text-gray-600 mt-2">{exhibition.description}</p>
      )}
    </div>
  );
};
```

### Backend Standards

- **Python Style**: Follow PEP 8 guidelines for Python code
- **Type Hints**: Use Python type hints for function parameters and return values
- **Async**: Use async/await for I/O bound operations
- **Docstrings**: Include docstrings for all functions and classes
- **Imports**: Sort imports according to isort conventions

Example FastAPI endpoint:

```python
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from app.models.exhibition import Exhibition
from app.services.json_storage import json_storage_service

router = APIRouter()

@router.get("/", response_model=List[Exhibition])
async def get_exhibitions(
    archived: Optional[bool] = Query(None, description="Filter by archived status")
):
    """
    Get all exhibitions, optionally filtered by archived status
    
    Parameters:
    - archived: Optional filter for archived exhibitions
    
    Returns:
    - List[Exhibition]: List of exhibition objects
    """
    try:
        return await json_storage_service.get_all_exhibitions(archived=archived)
    except Exception as e:
        # Log the error
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
```

## Git Workflow

We use a Git Flow-inspired workflow:

1. `main` branch: Contains the production-ready code
2. `develop` branch: Integration branch for features
3. Feature branches: Created from `develop` for each feature/bugfix

### Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fix branches: `fix/bug-name`
- Release branches: `release/version-number`
- Hotfix branches: `hotfix/issue-name`

### Commit Messages

Follow the conventional commits specification:

```
<type>(<scope>): <description>
```

Where `type` is one of:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
- `feat(exhibitions): add filtering by artist`
- `fix(api): resolve CORS issue with backend requests`
- `docs(readme): update setup instructions`

## Pull Request Process

1. **Create a Feature Branch**: From the `develop` branch
2. **Implement Changes**: Make your changes following the coding standards
3. **Add Tests**: Write tests that cover your changes
4. **Run Linting and Tests**: Ensure all tests pass and code meets linting standards
5. **Update Documentation**: Update any relevant documentation
6. **Create a Pull Request**: Against the `develop` branch with a detailed description
7. **Code Review**: Address review comments
8. **Merge**: After approval, the PR will be merged

### Pull Request Template

```markdown
## Description
[Describe the changes you've made]

## Related Issue
[Link to the related issue]

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Code refactoring
- [ ] Documentation update

## How Has This Been Tested?
[Describe the tests you ran]

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have added tests that prove my fix is effective or my feature works
- [ ] I have updated the documentation accordingly
- [ ] All new and existing tests passed
- [ ] I have checked for and resolved any linting issues
```

## Testing Guidelines

### Frontend Testing

- Use React Testing Library for component tests
- Write unit tests for utility functions
- Add integration tests for key user flows

Example test:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExhibitionCard } from './ExhibitionCard';

// Mock the custom hook
jest.mock('@/lib/hooks/useExhibition', () => ({
  useExhibition: jest.fn().mockReturnValue({
    exhibition: {
      id: '1',
      title: 'Test Exhibition',
      description: 'Test Description',
    },
    loading: false,
    error: null,
  }),
}));

describe('ExhibitionCard', () => {
  it('renders the exhibition title', () => {
    render(<ExhibitionCard exhibitionId="1" />);
    expect(screen.getByText('Test Exhibition')).toBeInTheDocument();
  });

  it('shows description when showDetails is true', () => {
    render(<ExhibitionCard exhibitionId="1" showDetails={true} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('hides description when showDetails is false', () => {
    render(<ExhibitionCard exhibitionId="1" showDetails={false} />);
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
```

### Backend Testing

- Use pytest for backend tests
- Write unit tests for services and utilities
- Add integration tests for API endpoints

Example test:

```python
import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_get_exhibitions():
    """Test getting all exhibitions"""
    response = client.get("/api/exhibitions")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    
def test_get_exhibition_by_id():
    """Test getting a specific exhibition by ID"""
    # First create a test exhibition or use a fixture
    # ...
    
    response = client.get(f"/api/exhibitions/{test_id}")
    assert response.status_code == 200
    assert response.json()["id"] == test_id
```

## Documentation Guidelines

- **Code Documentation**: Add docstrings and comments to clarify complex logic
- **API Documentation**: Document all API endpoints with parameters and return values
- **User Documentation**: Keep user-facing documentation up to date
- **Architecture Documentation**: Update architecture diagrams when making significant changes

## Performance Considerations

### Frontend Performance

- Use Next.js image optimization for images
- Implement lazy loading for components below the fold
- Minimize bundle size
- Avoid unnecessary re-renders

### Backend Performance

- Use async/await for I/O bound operations
- Implement caching where appropriate
- Optimize database queries
- Use pagination for large datasets

## Accessibility

The application should follow WCAG 2.1 Level AA standards:

- Ensure proper semantic HTML structure
- Maintain sufficient color contrast
- Provide text alternatives for non-text content
- Support keyboard navigation
- Add ARIA attributes where needed

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) 