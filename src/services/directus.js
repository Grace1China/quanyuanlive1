import { Directus } from "@directus/sdk";


export const directus = new Directus(process.env.REACT_APP_DIRECTUS_URL, {
  auth: {
    mode: 'json', // 'json' in Node.js
    autoRefresh: true,
    msRefreshBeforeExpires: 30000,
    staticToken: '',
  },
});
