import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Provider,
} from "@angular/core";

import { AssetLoader, DynamicAssets } from "../asset.service";

import {
  GA_TRACKING_ID,
  GA_COOKIE_DOMAIN,
  GoogleAnalyticsIds,
} from "./telemetry.definition";
import { TelemetryService } from "./telemetry.service";

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [],
})
export class TelemetryModule {
  /**
   * Import telemetry module for ROOT module.
   * @param config Configuration
   */
  static forRoot(gaIds: GoogleAnalyticsIds): ModuleWithProviders {
    const domain = window.location.host;
    const gaTrackingId = gaIds[domain] || gaIds.default;
    const providers: Provider[] = [
      {
        provide: GA_TRACKING_ID,
        useValue: gaTrackingId,
      },
      {
        provide: GA_COOKIE_DOMAIN,
        useValue: domain,
      },
      TelemetryService,
    ];
    if (gaTrackingId && gaTrackingId.length) {
      providers.push({
        provide: APP_INITIALIZER,
        useFactory: TelemetryModule.initializer,
        deps: [GA_TRACKING_ID, TelemetryService],
        multi: true,
      });
    }
    return { ngModule: TelemetryModule, providers };
  }

  static initializer(gaId: string, telemetry: TelemetryService): any {
    return async (): Promise<boolean> => {
      AssetLoader.load(
        DynamicAssets.GoogleAnalytics,
        {},
        {
          id: gaId,
        }
      ).then(() => {
        telemetry.init();
      });
      return true;
    };
  }
}
