# Tendler

Tendler is a full-stack Tender Management System designed to streamline the process of managing tenders, projects, and related documentation. The system consists of a React frontend (`tendler`) and a NestJS backend (`tendler-api`), which will be deployed as serverless functions on AWS Lambda.

## Project Structure

### Tendler (Frontend - React)

│── build/ │── node_modules/ │── public/ │── src/ │── .eslintrc.json │── .gitignore │── .npmrc │── .prettierrc.json │── CHANGELOG.md │── genezio.yaml │── ISSUE_TEMPLATE.md │── jsconfig.json │── LICENSE.md │── package-lock.json │── package.json │── README.md

shell
Copy
Edit

### Tendler API (Backend - NestJS)

│── dist/ │── node_modules/ │── src/ │── test/ │── .env │── .eslintrc.js │── .gitignore │── .prettierrc │── nest-cli.json │── package-lock.json │── package.json │── README.md │── tsconfig.build.json │── tsconfig.json

pgsql
Copy
Edit

## Frontend - Tendler (React)

The frontend is built using React and serves as the user interface for the Tender Management System. It includes components for user authentication, project and tender tracking, document uploads, and notifications.

### Key Features

- Modern UI built with Material-UI.
- Role-based access control (Admin, Finance, Project Manager, etc.).
- Integration with backend APIs for real-time data management.
- Planned Deployment: AWS S3 + CloudFront.

## Backend - Tendler API (NestJS + Serverless)

The backend is developed using NestJS, providing a RESTful API for handling user authentication, tender management, document storage, and project tracking. It is soon to be migrated to AWS Lambda for serverless execution.

### Key Features

- Authentication & Authorization (JWT-based).
- Database Integration (PostgreSQL via TypeORM).
- File Uploads to S3 for document management.
- WebSockets for Chat using AWS API Gateway WebSockets.
- Planned Deployment: AWS Lambda + API Gateway + DynamoDB.

## Installation & Setup

### Prerequisites

- Node.js (LTS recommended)
- PostgreSQL (for backend development)
- AWS CLI (for deploying to AWS Lambda)

### Clone the Repository

```bash
git clone https://github.com/your-repo/tendler.git
cd tendler
Frontend Setup
bash
Copy
Edit
cd tendler
npm install
npm start
Backend Setup
bash
Copy
Edit
cd tendler-api
npm install
cp .env.example .env  # Configure environment variables
npm run start:dev
Deployment
Frontend Deployment (React)
Local: npm run build
Production: Deploy build/ to AWS S3 + CloudFront
Backend Deployment (Serverless NestJS on AWS Lambda)
bash
Copy
Edit
cd tendler-api
serverless deploy
License
This project is licensed under the MIT License. See LICENSE.md for details.

Contributing
Please read ISSUE_TEMPLATE.md for contributing guidelines.

Future Enhancements
✅ Full serverless backend migration
✅ Improved CI/CD pipeline for automatic deployments
✅ Real-time notifications using AWS SNS/SQS
✅ Mobile-friendly UI improvements
🚀 Stay tuned for updates!