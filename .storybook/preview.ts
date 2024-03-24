import type {Preview} from '@storybook/react';
import '../src/app/globals.css';
import {withThemeByDataAttribute} from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'hd-orange-light',
      values: [
        {name: 'hd-orange-light', value: '#ffffff'},
        {name: 'hd-orange-dark', value: '#111827'},
        {name: 'bblue-light', value: '#ffffff'},
        {name: 'bblue-dark', value: '#111827'},
      ],
    },
  },
};
export const decorators = [
  withThemeByDataAttribute({
    themes: {
      'Default-hd-orange-light': 'Default-hd-orange-light',
      'hd-orange-dark': 'hd-orange-dark',
      'bblue-light': 'bblue-light',
      'bblue-dark': 'bblue-dark',
    },
    defaultTheme: 'Default-hd-orange-light',
    attributeName: 'data-theme',
  }),
];

export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        {name: 'Default-hd-orange-light', dataTheme: 'Default-hd-orange-light', color: '#ea9549'},
        {name: 'hd-orange-dark', dataTheme: 'hd-orange-dark', color: '#ea9549'},
        {name: 'bblue-light', dataTheme: 'bblue-light', color: '#006aff'},
        {name: 'bblue-dark', dataTheme: 'bblue-dark', color: '#006aff'},
      ],
    },
  },
};

export default preview;
