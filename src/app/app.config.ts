import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import {
  Chart, LineController, LineElement, PointElement,
  BarController, BarElement,
  LinearScale, CategoryScale, Filler, Tooltip, Legend
} from 'chart.js';

import { routes } from './app.routes';

Chart.register(
  LineController, LineElement, PointElement,
  BarController, BarElement,
  LinearScale, CategoryScale, Filler, Tooltip, Legend
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
};
