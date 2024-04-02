export interface Response<T> {
    statusCode: number;
    statusMessage: string;
    isSuccess: boolean;
    data: T;
    errors: Error[];
  }
  
  export interface CommonResult {
    isSuccess: boolean;
  }
  
  export interface Error {
    key: string;
    message: string;
  }