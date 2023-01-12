This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## React

This project uses React with Next.js.

### Component/UI Library

Radix UI primitives.

- https://www.radix-ui.com/docs/primitives

## CSS

This project has TailwindCSS and SASS. Some components use SCSS for practice, but the majority of the project uses TailwindCSS with CVA for DX and fast prototyping.

https://tailwindcss.com/
https://github.com/joe-bell/cva

### Typography

https://fonts.google.com/specimen/IBM+Plex+Sans

### Colors

Radix colors.

- https://www.radix-ui.com/colors

## Testing

### Unit Testing

Use Jest & RTL for Unit testing.
To run jest, use npm run test.

- https://jestjs.io/docs/getting-started
- https://testing-library.com/docs/
- https://testing-library.com/docs/user-event/intro/

### Integration & E2E Testing

For integration & E2E testing, use Cypress or playright with Percy integration.

### Accessibility

Use @axe-core by uncommenting \_App.js.

## Icons

Radix-icons & Carbon icons

- https://icons.radix-ui.com/
- https://carbondesignsystem.com/guidelines/icons/library/

### ORM

Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
Prisma Migrate: Migration system
Prisma Studio: GUI to view and edit data in your database

#### Synchronize Prisma schema with DB schema

To prototype schemas/models in schema.prisma, use npx prisma db push

If there already exists a migration history, use npx prisma migrate dev --name added-tags

## Deployment

### ECR & ECS & EC2

#### Create a Docker Image

Install docker

Build a docker image with docker build -t <imagename> .

#### Push Docker Image to ECR

Create a ECR repository.

Ensure you have proper permissions for the repository.

Run the push commands

#### Create an ECS Cluster

Create a cluster, then create a task definition.

Create a port mapping with 80:3000 to allow HTTP connections to our container's exposed 3000 port

In your container, set environment variables and security group to open ports 22, 80, and 433 to allow SSH, HTTP, HTTPS.

#### Run service

In your cluster, run the task definition as a service with EC2 launch. Auto scale will provision a new container with your task running.

#### Enable HTTPS + SSL

Because this is a secure web app, HTTPS must be enabled. To do this, you can purchase a custom domain and request a public certificate with Route 53 and ACM, and set up an application load balancer.

### AWS Amplify

To deploy with AWS Amplify, connect your git repository with AWS amplify for CI/CD. Then, set environment variables as needed.

https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html
