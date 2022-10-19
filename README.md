This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Additionally, it has npm packages that I frequently use in my workflow. 

## React
This project uses React with Next.js. No component library is installed.


### Component/UI Library
- https://ui.docs.amplify.aws/react/getting-started/installation
- https://mui.com/base/getting-started/overview/
- https://www.radix-ui.com/docs/primitives/overview/getting-started

## CSS
This project has TailwindCSS or SASS to use for CSS. Choose one and delete the other.
- https://tailwindcss.com/docs/installation

### Typography
None installed. For a base preset, use Tailwind Typography plugin.
- https://tailwindcss.com/docs/plugins#official-plugins

### Colors
Uses Radix colors.
- https://www.radix-ui.com/colors

### Implementation
Create a ThemeProvider that wraps _App.js to provide a theme context to your entire app. With this, you can easily create a light/dark mode with props.

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
Use @axe-core by uncommenting _App.js.

## Icons
radix-icons are installed for icons. 
- https://icons.radix-ui.com/




