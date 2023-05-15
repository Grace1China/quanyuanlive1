import { Directus } from "@directus/sdk";

// import { IAuth, Directus } from '@directus/sdk';

// class MyAuth extends IAuth {
//   mode: 'json', // 'json' in Node.js
//   autoRefresh: true,
//   msRefreshBeforeExpires: 30000,
//   // staticToken: '',
//   async login() {
//     return { access_token: '', expires: 0 };
//   }
//   async logout() { }
//   async refresh() {
//     return { access_token: '', expires: 0 };
//   }
//   async static() {
//     return true;
//   }
// }

// const directus = new Directus('https://example.directus.app', {
// 	auth: new MyAuth(),
// });
export const directus = new Directus(process.env.REACT_APP_DIRECTUS_URL, {
  auth: {
    mode: 'json', // 'json' in Node.js
    autoRefresh: true,
    msRefreshBeforeExpires: 30000,
    // staticToken: '',
  },
});
