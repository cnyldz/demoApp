import 'dotenv/config';

export default ({ config }) => {
  return {
    expo: {
        name: 'demoApp',
        slug: 'demoApp',
        version: '1.0.0',
    extra: {
      API_URL: process.env.API_URL,
      TOKEN_KEY: process.env.TOKEN_KEY,
    },
  },
};
};
