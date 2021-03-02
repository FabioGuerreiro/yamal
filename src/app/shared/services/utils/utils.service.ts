import { Injectable } from '@angular/core';
import { INamedSubscription } from '../../models/named-subscriptions/named-subscription.model';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor() { }

  /**
   * Gets base url
   * @returns base url
   */
  public static getBaseUrl(): string {
    return document.getElementsByTagName('base')[0].href;
  }

  /**
   * Gets route
   * @returns route
   */
  public static getRoute(): string {
    return window.location.href.substring(this.getBaseUrl().length - 1);
  }

  /**
   * Navigates to given url
   * @param url - url to navigate to
   */
  public static goTo(url: string) {
    window.location.href = '' + url;
  }

  /**
   * Generates unique id
   * @returns unique id
   */
  public static generateUniqueId(): string {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c: string): string => {
        // tslint:disable-next-line: no-bitwise
        const r = (Math.random() * 16) | 0;
        // tslint:disable-next-line: no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
    return uuid;
  }

  /**
   * Checks if a given var is realy defined and is not null
   * @param val - variable to be tested
   */
  public static isDefined(val: any): boolean {
    return typeof(val) !== 'undefined' && val !== undefined && val !== null;
  }

  /**
   * Convert a variable to lower-case string if possible (null if not possible)
   * @param val - variable to convert
   */
  public static toLowerCaseStringOrNull(val: any): string | null {
    if (this.isDefined(val)) {
      return val.toString().toLowerCase();
    } else {
      return null;
    }
  }

  /**
   * Unsubscribes from a named subscription if it exists in a given list
   * @param subscription name of subscription to unsubscribe
   * @param subscriptions list of existing subscriptions
   */
  public static unsubscribeIfExists(subscription: string, subscriptions: INamedSubscription[]) {
    const subs = subscriptions.filter((s) => s.name === subscription);
    const indexes: number[] = [];

    if (subs.length > 0) {
      subs.map((s) => {
        indexes.push(subscriptions.indexOf(s));
        s.subscription.unsubscribe();
      });
    }
    if (indexes.length > 0) {
      indexes.map((i) => {
        subscriptions.splice(i, 1);
      });
    }
  }
}
