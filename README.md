This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## React

This project uses React with Next.js.

### Component/UI Library

Radix UI primitives.

- https://www.radix-ui.com/docs/primitives

## CSS

This project has TailwindCSS and SASS. Some components use SCSS for practice, but the majority of the project uses TailwindCSS with CVA for DX and fast prototyping.

### Typography

https://fonts.google.com/specimen/Assistant

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
