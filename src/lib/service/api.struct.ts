export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface RequestParams {
  product_id?: string | null;

  [key: string]: string;
}

export enum ResponseParser {
  ArrayBuffer = "arraybuffer",
  Blob = "blob",
  Json = "json",
  Text = "text",
}

export interface ApiReference {
  /**
   * URL to Backend
   */
  readonly url: string;
  /**
   * Request HTTP-Method
   */
  readonly method: HttpMethods;
  /**
   * Aggregatable JSON key in body
   */
  readonly bodyAggrKeys?: Array<string | null>;
  /**
   * Response type
   */
  readonly responseType?:
    | ResponseParser.ArrayBuffer
    | ResponseParser.Blob
    | ResponseParser.Json
    | ResponseParser.Text;
}

export class UrlFormatter {
  static knownKeys = [
    // well-known parameters
    "product_id",
  ];
  static _patternCache = {}; // cached patterns
  static _getPattern(key: string) {
    let pattern = UrlFormatter._patternCache[key];
    if (!pattern) {
      pattern = new RegExp(`\{${key}\}`, "g");
      UrlFormatter._patternCache[key] = pattern;
    }
    return pattern;
  }
  static applyToUrl(url: string, params: RequestParams) {
    const paramKeys = new Set([
      ...Object.keys(params),
      ...UrlFormatter.knownKeys,
    ]);
    paramKeys.forEach((key) => {
      url = url.replace(UrlFormatter._getPattern(key), params[key] || "");
    });
    if (url.startsWith("/")) {
      url = url.substr(1);
    }
    return url;
  }
}

export interface ApiRequest<T> {
  /**
   * Page Path
   */
  page?: string;
  /**
   * Request Identity, will be used to build resposne structure
   */
  readonly identity: string;
  /**
   * API reference
   */
  readonly apiRef: ApiReference;
  /**
   * Query Parameters filled to request-url
   */
  params?: RequestParams;
  /**
   * Request Body
   */
  body?: T;
  /**
   * Renew Session Expiry or not.
   * Default is "true", set to "false" to omit session-renewal.
   */
  renewSession?: boolean;

  /**
   * Preserved request won't be cancelled by route change event.
   * Default is "false", API call can be cancelled by route event.
   */
  preserved?: boolean;

  /**
   * Skip redirect action if no privilege
   * Default is "false", only set this flag for requests inside libs.
   */
  skipPrivilegeRedirect?: boolean;
}

export interface ApiResponse<R> {
  /**
   * Page Path
   */
  readonly page: string;
  /**
   * Response Identity, matched to Request Identity.
   */
  readonly identity: string;
  /**
   * Response HTTP-Status
   */
  readonly status: number;
  /**
   * Response Message (null = success)
   */
  readonly message: string | null;
  /**
   * Response Body
   */
  readonly body: R;
}
