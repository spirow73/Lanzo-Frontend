# Lanzo Front-End

![Lanzo Logo](lanzo-logo.png)

## Table of Contents
1. [Project Overview](#project-overview)
   - [Key Technologies](#key-technologies)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Collaboration Protocols](#collaboration-protocols)
   - [Code Contribution](#code-contribution)
   - [Code Quality](#code-quality)
5. [Development Environment](#development-environment)
   - [Docker](#docker)
   - [Environment Variables](#environment-variables)
6. [Deployment](#deployment)
   - [Continuous Deployment with GitHub Actions](#continuous-deployment-with-github-actions)
   - [Deployment to Amazon ECS](#deployment-to-amazon-ecs)
7. [Testing](#testing)
   - [Unit Tests](#unit-tests)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
   - [Common Issues](#common-issues)
   - [Getting Help](#getting-help)
10. [License](#license)
11. [Contact](#contact)

---

## Project Overview
Lanzo is a front-end application designed to enable users to quickly deploy pre-designed infrastructure solutions on Amazon Web Services. Users select the type of services they want (e.g., choice of database type, compute engine such as EC2 or Fargate, etc.), and the system automatically generates the corresponding Terraform configuration. The goal is to provide a simple and scalable solution for users with little cloud experience.

This repository contains the front-end code for Lanzo.

### Key Technologies
- **ReactJS**: For building a modern, responsive user interface.
- **Tailwind CSS**: For rapid and efficient styling.
- **Vite**: For fast development and optimized builds.
- **TypeScript**: To ensure type-safe development.
- **Docker**: For containerized development and deployment.
- **Amazon ECS**: For scalable cloud deployments.
- **CI/CD with GitHub Actions**: Automated build, test, and deployment pipelines.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (version 18 or higher)
- **npm** (or yarn, if preferred)
- **Docker**
- **Docker Compose**
- **AWS CLI** (for deployments to ECS)
- **Git**

### Installation
1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/yourusername/lanzo-frontend.git
   cd lanzo-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Project Structure
```
lanzo-frontend/
├── public/             # Static assets
├── src/                # React source code
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles (including Tailwind CSS configuration)
│   └── App.tsx         # Main app component
├── .env                # Environment variables
├── package.json
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

---

## Collaboration Protocols

### Code Contribution
1. **Branching Strategy**:
   - Use GitFlow on GitHub.
   - Main branches:
     - `main`: Production-ready code.
     - `develop`: Integration branch for development.
   - Feature branches: `feature/<feature-name>`
   - Bugfix branches: `bugfix/<issue-name>`

2. **Commit Messages**:
   - Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
   - Examples:
     - `feat: Add user authentication functionality`
     - `fix: Resolve issue with navigation menu`

3. **Pull Requests**:
   - Open a pull request on GitHub to merge changes into `develop` or `main`.
   - Provide detailed descriptions and link related issues.
   - At least one reviewer must approve before merging.

### Code Quality
- Use **ESLint** and **Prettier** for linting and formatting:
  ```bash
  npm run lint
  npm run format
  ```
- Write unit tests for components and features using Jest and React Testing Library:
  ```bash
  npm run test
  ```

---

## Development Environment

### Docker
To ensure a consistent development environment, the project is containerized. To run the application using Docker:
1. Build and start the container:
   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```
2. Access the application:
   ```
   http://localhost:3000
   ```

### Environment Variables
Create a `.env` file at the root of your project and define the following:
```env
VITE_REACT_APP_API_URL=https://api.lanzo.com
VITE_REACT_APP_ENV=development
```

---

## Deployment

### Continuous Deployment with GitHub Actions
The CI/CD pipeline defined in `.github/workflows/ci-cd.yml` automates the build, test, and deployment process:
1. **Build Stage**:
   - Builds the Docker image and pushes it to Amazon ECR.
2. **Test Stage**:
   - Runs unit tests.
3. **Deploy Stage**:
   - Updates the ECS service with the new Docker image.

### Deployment to Amazon ECS
1. Authenticate with AWS ECR:
   ```bash
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
   ```
2. Push the Docker image to ECR:
   ```bash
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/lanzo-frontend
   ```
3. Update the ECS service:
   ```bash
   aws ecs update-service --cluster <cluster-name> --service <service-name> --force-new-deployment
   ```

---

## Testing

### Unit Tests
Run unit tests using Jest:
```bash
npm run test
```

---

## Best Practices
1. **Code Reviews**:
   - Every pull request should be reviewed by at least one other developer.
2. **Documentation**:
   - Document new components and features in the `/docs` folder.
3. **Error Handling**:
   - Implement error boundaries and proper logging in React components.
4. **Performance Optimization**:
   - Utilize React’s `useMemo` and `useCallback` hooks to minimize unnecessary re-renders.

---

## Troubleshooting

### Common Issues
1. **Application Fails to Start**:
   - Verify that all environment variables are set correctly.
   - Run `npm install` to ensure all dependencies are installed.
2. **Docker Build Fails**:
   - Check that your `package.json` and `Dockerfile` are properly configured.
   - Review your `.dockerignore` for unintended exclusions.

### Getting Help
If you encounter issues, please open an issue in the [GitHub issue tracker](https://github.com/yourusername/lanzo-frontend/issues) with:
- A detailed description of the problem.
- Steps to reproduce the issue.
- Any relevant logs or screenshots.

---

## License
TBD

---

## Contact
For questions or support, please contact:
- **Email**: TBD
