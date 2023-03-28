Gym management software is a type of software that is designed to help gym owners and operators manage their operations, including tracking clients and memberships, scheduling appointments, and processing payments.

Gym management software can include a variety of features, such as a client database, a calendar for scheduling classes and personal training sessions, and a payment system for membership renewals and additional services. It can be used to improve the efficiency and accuracy of gym operations, as well as to provide a better experience for clients through a seamless identification and billing process.

This project focuses on member registration and management, subscription management, and member check-in. Additional features such as point of sale, member class scheduling, employee management, and analytics are mentioned throughout the application, but are outside the project scope.

To learn more, you can read the case study on my portfolio website.

## Project Demo

https://main.dcu3l4nw2pzwu.amplifyapp.com/

To login, I provided guest credentials which can be found in the case study on my portfolio website.

## Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Other tech involved in this project are

- Figma,
- TailwindCSS
- SCSS
- CVA
- Radix UI
- Jotai
- Auth0
- AWS RDS w/ Postgres, S3, and Amplify
- GraphQL, Apollo, Prisma, Nexus
- Stripe
- Jest & RTL

https://github.com/joe-bell/cva

## Design

- https://fonts.google.com/specimen/IBM+Plex+Sans
- https://www.radix-ui.com/colors
- https://icons.radix-ui.com/
- https://carbondesignsystem.com/guidelines/icons/library/

## Testing

Use Jest & RTL for Unit testing.
To run jest, use `npm run test`.

- https://jestjs.io/docs/getting-started
- https://testing-library.com/docs/

For integration & E2E testing, use Cypress or playright with Percy integration.

### Accessibility

Use @axe-core by uncommenting \_App.js.

### ORM

To prototype schemas/models in schema.prisma, use `npx prisma db push`

If a migration history already exists, use `npx prisma migrate dev --name added-tags`

## Deployment

### ECR & ECS & EC2

#### Create a Docker Image

Install docker

Build a docker image with `docker build -t <imagename>`

#### Push Docker Image to ECR

Create a ECR repository.

Ensure you have proper permissions for the repository.

Run the push commands.

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
