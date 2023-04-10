import type { Preview } from '@storybook/react';
import '@/styles/styles.css';
import '@fontsource/ibm-plex-sans';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      sort: 'alpha',
    },
  },
};

export default preview;
