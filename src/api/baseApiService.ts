const someText = "";
export default someText;
// import axios from 'axios';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import * as Sentry from 'sentry-expo';

// const anyObject: any = {};

// interface Result {
//     isSuccess: boolean;
//     errorMessage: string;
// }

// interface ResultWithValueAndHttpCode<T> extends Result {
//     value: T;
//     httpCode: number;
// }

// interface ResultWithHttpCode {
//     isSuccess: boolean;
//     errorMessage: string;
//     httpCode: number;
// }

// export class BaseApiService {
//     private _baseUrl = '';

//     constructor(newBaseUrl?: string) {
//         if (newBaseUrl != null) this._baseUrl = newBaseUrl;
//         axios.interceptors.request.use(async (request) => {
//             const token = await firebase.auth()?.currentUser?.getIdToken?.() ?? '';
//             // tslint:disable-next-line
//             request.headers.common['Authorization'] = 'Bearer ' + token;
//             return request;
//         }, (err) => {
//             Sentry.Native.captureException(err)
//             return Promise.reject(err);
//         });
//     }

//     protected async get<T>(url: string): Promise<ResultWithValueAndHttpCode<T>> {
//         try {
//             const result = await axios.get<T>(`${this._baseUrl}/${url}`);
//             return {
//                 isSuccess: true,
//                 value: result.data,
//                 errorMessage: '',
//                 httpCode: result.status
//             };
//         } catch (ex) {
//             console.log("baseApiService: ", `${ex.message} - ${this._baseUrl}/${url}`);
//             Sentry.Native.captureException(ex)
//             return {
//                 isSuccess: false,
//                 value: anyObject,
//                 errorMessage: ex.response.data,
//                 httpCode: ex.response.status
//             };
//         }
//     }

//     protected async getWithParams<T>(url: string, params: object): Promise<ResultWithValueAndHttpCode<T>> {
//         try {
//             const result = await axios.get<T>(`${this._baseUrl}/${url}`, { params });
//             return {
//                 isSuccess: true,
//                 value: result.data,
//                 errorMessage: '',
//                 httpCode: result.status
//             };
//         } catch (ex) {
//             return {
//                 isSuccess: false,
//                 value: anyObject,
//                 errorMessage: ex.response.data,
//                 httpCode: ex.response.status
//             };
//         }
//     }

//     protected async deleteWithParams<T>(url: string, params: object): Promise<ResultWithValueAndHttpCode<T>> {
//         try {
//             const result = await axios.delete<T>(`${this._baseUrl}/${url}`, { params });
//             return {
//                 isSuccess: true,
//                 value: result.data,
//                 errorMessage: '',
//                 httpCode: result.status
//             };
//         } catch (ex) {
//             console.log("baseApiService: ", ex.message);
//             return {
//                 isSuccess: false,
//                 value: anyObject,
//                 errorMessage: ex.response.data,
//                 httpCode: ex.response.status
//             };
//         }
//     }

//     protected async post<T>(url: string, data: any, manipulateHeaders?: (headers: any) => void): Promise<ResultWithValueAndHttpCode<T>> {
//         const realUrl = `${this._baseUrl}/${url}`;
//         try {
//             const result = await axios.post<T>(realUrl, data);
//             if (manipulateHeaders != null) manipulateHeaders(result.headers);

//             return {
//                 isSuccess: true,
//                 value: result.data,
//                 errorMessage: '',
//                 httpCode: result.status
//             };

//         } catch (ex) {
//             Sentry.Native.captureException(ex)
//             console.log("baseApiService: ", `${ex.message} - ${this._baseUrl}/${url}`);
//             return {
//                 isSuccess: false,
//                 value: anyObject,
//                 errorMessage: ex.response.data,
//                 httpCode: ex.response.status
//             };
//         }
//     }

//     protected async delete(url: string, manipulateHeaders?: (headers: any) => void): Promise<ResultWithHttpCode> {
//         try {
//             const result = await axios.delete(`${this._baseUrl}/${url}`);
//             if (manipulateHeaders != null) manipulateHeaders(result.headers);
//             return {
//                 isSuccess: true,
//                 errorMessage: '',
//                 httpCode: result.status
//             };
//         } catch (ex) {
//             return {
//                 isSuccess: false,
//                 errorMessage: ex.message,
//                 httpCode: ex.response.status
//             };
//         }
//     }

//     protected async put<T>(url: string, data: any, manipulateHeaders?: (headers: any) => void): Promise<ResultWithValueAndHttpCode<T>> {
//         const realUrl = `${this._baseUrl}/${url}`;
//         try {
//             const result = await axios.put<T>(realUrl, data);
//             if (manipulateHeaders != null) manipulateHeaders(result.headers);

//             return {
//                 isSuccess: true,
//                 value: result.data,
//                 errorMessage: '',
//                 httpCode: result.status
//             };

//         } catch (ex) {
//             Sentry.Native.captureException(ex)
//             console.log("baseApiService: ", `${ex.message} - ${this._baseUrl}/${url}`);
//             return {
//                 isSuccess: false,
//                 value: anyObject,
//                 errorMessage: ex.response.data,
//                 httpCode: ex.response.status
//             };
//         }
//     }

//     protected async patch<T>(url: string, data?: any, manipulateHeaders?: (headers: any) => void): Promise<ResultWithValueAndHttpCode<T>> {
//         const realUrl = `${this._baseUrl}/${url}`;
//         try {
//             const result = await axios.patch<T>(realUrl, data);
//             if (manipulateHeaders != null) manipulateHeaders(result.headers);
//             return {
//                 isSuccess: true,
//                 value: result.data,
//                 errorMessage: '',
//                 httpCode: result.status
//             };
//         } catch (ex) {
//             return {
//                 isSuccess: false,
//                 value: anyObject,
//                 errorMessage: ex.response.data,
//                 httpCode: ex.response.status
//             };
//         }
//     }
// }

