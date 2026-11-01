(self as any)['FIREBASE_APPCHECK_DEBUG_TOKEN'] = 'Your debug token';

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

registerLocaleData(en);

const firebaseConfig = {
  apiKey: 'Your API key',
  authDomain: 'citypass-35440.firebaseapp.com',
  projectId: 'citypass-35440',
  storageBucket: 'citypass-35440.firebasestorage.app',
  messagingSenderId: '989567102188',
  appId: '1:989567102188:web:23ef1a27f6326d493c89c9',
};

const firebaseApp = initializeApp(firebaseConfig);

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('debug')
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideNzI18n(en_US), provideAnimationsAsync(), provideHttpClient(),
    { provide: 'FIREBASE_APP', useValue: firebaseApp }
  ]
};
