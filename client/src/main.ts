import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));


// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// // Bootstrap the AppModule, with ngZoneEventCoalescing enabled for performance
// platformBrowserDynamic().bootstrapModule(AppModule, {
//   ngZoneEventCoalescing: true  // Optimize performance by coalescing events
// })
//   .catch(err => console.error('Error during bootstrap:', err));
