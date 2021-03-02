import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from '../utils/utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  private apiRoot: string;
  private accessToken: string;

  /**
   * Creates an instance of BaseApiService, an extendable service providing collection of functions to send http requests to apis.
   * @param http: http client from @angular/common/http
   */
  constructor(
    public http: HttpClient
  ) { }

  /**
   * Sets api root
   * @param eventUrl the url for the api root
   */
  protected setApiRoot(apiRoot: string) {
    this.apiRoot = apiRoot;
  }

  /**
   * Sets access token
   * @param accessToken the athentication token
   */
  protected setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Adds headers to an HTTP request
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @param [otherProperties]: extra properties to add to the http request options that are not headers
   * @returns  http request options
   */
  protected addHeaders(headers?: HttpHeaders, otherProperties?: object) {
    let newHeaders: HttpHeaders = new HttpHeaders();

    if (headers) {
      newHeaders = headers;
    }

    if (Utils.isDefined(this.accessToken)) {
      newHeaders = newHeaders.append('Cache-Control', 'no-cache');
      newHeaders = newHeaders.append('Pragma', 'no-cache');
      newHeaders = newHeaders.append('Expires', '0');
      newHeaders = newHeaders.append('Authorization', `Bearer ${this.accessToken}`);
    }

    const returnObj: object = Utils.isDefined(newHeaders) ? {headers: newHeaders} : {};

    if (Utils.isDefined(otherProperties)) {
      for (const attrname in otherProperties) {
        if (otherProperties.hasOwnProperty(attrname)) {
          (returnObj as any)[attrname] = (otherProperties as any)[attrname]; // TODO: find a better solution for this
        }
      }
    }

    return returnObj;
  }

  /**
   * Creates a full api url combining the apiRoot with the relative path
   * @param rel: relative path inside api
   * @returns full api url
   */
  protected apiUrl(rel: string): string {
    const url = `${this.apiRoot}${rel}`;
    return url;
  }

  /**
   * Gets single entity from api
   * @param id: id of desired entity
   * @param [rel]: relative path inside api
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns entity
   */
  protected get<T>(id: number, rel = '', headers?: HttpHeaders): Observable<any> {
   return this.http.get(`${this.apiUrl(rel)}${id.toString()}`, this.addHeaders(headers));
  }

  /**
   * Gets a file from api
   * @param [rel]: relative path inside api
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns file
   */
  protected getFile<T>(rel = '', headers?: HttpHeaders): Observable<any> {
    return this.http.get(this.apiUrl(rel), this.addHeaders(headers, { responseType: 'arraybuffer', observe: 'response' }));
  }

  /**
   * Gets all entities from api
   * @param [rel]: relative path inside api
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns list of entities
   */
  protected getAll<T>(rel = '', headers?: HttpHeaders): Observable<any> {
    return this.http.get(this.apiUrl(rel), this.addHeaders(headers));
  }

  /**
   * Posts to the api
   * @param [rel]: relative path inside api
   * @param [entity]: the entity being posted
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns post result
   */
  protected post<T>(rel = '', entity: T | null = null, headers?: HttpHeaders): Observable<any> {
    return this.http.post<T>(this.apiUrl(rel), entity, this.addHeaders(headers));
  }

  /**
   * Puts to the api
   * @param [rel]: relative path inside api
   * @param [entity]: the entity being puted
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns put result
   */
  protected put<T>(rel = '', entity: T | null = null, headers?: HttpHeaders): Observable<any> {
    return this.http.put<T>(this.apiUrl(rel), entity, this.addHeaders(headers));
  }

  /**
   * Puts to the api with id
   * @param [rel]: relative path inside api
   * @param id: id of the entity being puted
   * @param [entity]: the entity being puted
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns put result
   */
  protected putWithId<T>(rel = '', id: number, entity: T | null = null, headers?: HttpHeaders): Observable<any> {
    return this.http.put<T>(this.apiUrl(rel) + id.toString(), entity, this.addHeaders(headers));
  }

  /**
   * Alias of post but entity is mandatory
   * @param [rel]: relative path inside api
   * @param entity: the entity being posted
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns post result
   */
  protected add<T>(rel = '', entity: T, headers?: HttpHeaders): Observable<any> {
    return this.post<T>(rel, entity, headers);
  }

  /**
   * Alias of put but entity is mandatory
   * @param [rel]: relative path inside api
   * @param entity: the entity being puted
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns put result
   */
  protected update<T>(rel = '', entity: T, headers?: HttpHeaders): Observable<any> {
    return this.put<T>(rel, entity, headers);
  }

  /**
   * Deletes from api
   * @param id: id of entoty being deleted
   * @param [rel]: relative path inside api
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns delete result
   */
  protected delete<T>(id: number, rel = '', headers?: HttpHeaders): Observable<any> {
    return this.http.delete(this.apiUrl(rel) + id.toString(), this.addHeaders(headers));
  }

  /**
   * Patches an entity in the api
   * @param [rel]: relative path inside api
   * @param [entity]: the entity being posted
   * @param [headers]: extra headers to be added appart from authorization related ones
   * @returns patch result
   */
  protected patch<T>(rel = '', entity: T | null = null, headers?: HttpHeaders): Observable<any> {
    return this.http.patch<T>(this.apiUrl(rel), entity, this.addHeaders(headers));
  }
}
