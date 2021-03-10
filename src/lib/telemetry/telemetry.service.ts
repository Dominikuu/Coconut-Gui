import { Inject, Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

import {
  GA_TRACKING_ID,
  GA_COOKIE_DOMAIN,
  GaViewPromotion,
  GoogleAnalyticsEvent,
} from "./telemetry.definition";

declare global {
  export interface Window {
    dataLayer: Array<any>;
    gtag: Function;
  }
}

@Injectable()
export class TelemetryService implements OnDestroy {
  private _initialized: boolean = false;

  private gtag: Function;
  private events: Subject<[string, any]> = new Subject();

  constructor(
    @Inject(GA_TRACKING_ID) private gaId: string,
    @Inject(GA_COOKIE_DOMAIN) private domain: string
  ) {}

  private initGoogleAnalytics(): void {
    this.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.dataLayer = window.dataLayer || [];
    window.gtag = this.gtag;
    this.gtag("js", new Date());
    this.gtag("config", this.gaId, {
      cookie_domain: this.domain,
      anonymize_ip: true, // for GDPR
    });
    this.events.subscribe(([action, params]) => {
      this.gtag("event", action, params);
    });
  }

  init(): boolean {
    if (this._initialized) {
      return true;
    }
    this._initialized = true;
    // initialize Google Analytics
    this.initGoogleAnalytics();
    return this._initialized;
  }

  sendLoginEvent(method: string): void {
    this.events.next([GoogleAnalyticsEvent.LOGIN, { method }]);
  }

  sendPageViewEvent(segments: string[] | string): void {
    if (segments == null) {
      return;
    }
    const path = Array.isArray(segments)
      ? `/${segments.join("/")}`
      : `/${segments}`;
    this.events.next([
      GoogleAnalyticsEvent.PAGE_VIEW,
      { page_path: path.replace(/^\/\/*/, "/") },
    ]);
  }

  sendViewPromotionEvent(...promotions: GaViewPromotion[]): void {
    if (promotions == null || !promotions.length) {
      return;
    }
    this.events.next([GoogleAnalyticsEvent.VIEW_PROMOTION, { promotions }]);
  }

  sendTimingCompleteEvent(
    name: string,
    milliseconds: number,
    category?: string,
    label?: string
  ): void {
    this.events.next([
      GoogleAnalyticsEvent.TIMING_COMPLETE,
      {
        name,
        value: milliseconds,
        event_category: category,
        event_label: label,
      },
    ]);
  }

  ngOnDestroy(): void {
    this.events.complete();
  }
}
