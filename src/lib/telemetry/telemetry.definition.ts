import {InjectionToken} from '@angular/core';

export const GA_TRACKING_ID = new InjectionToken<string>('GoogleAnalyticsId');

export const GA_COOKIE_DOMAIN = new InjectionToken<string>('GoogleAnalyticsDomain');

export interface GaViewPromotion {
    id: string;
    name: string;
    [key: string]: string;
}

export interface GoogleAnalyticsIds {
    default: string;
    [domain: string]: string;
}

export enum GoogleAnalyticsEvent {
    LOGIN = 'login',
    PAGE_VIEW = 'page_view',
    SELECT_CONTENT = 'select_content',
    VIEW_ITEM = 'view_item',
    VIEW_ITEM_LIST = 'view_item_list',
    VIEW_PROMOTION = 'view_promotion',
    TIMING_COMPLETE = 'timing_complete',
}
