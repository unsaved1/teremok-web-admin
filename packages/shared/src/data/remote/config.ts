import { type AxiosInstance } from "axios";

export interface IHttpClient {
  get<T>(url: string, params?: Record<string, unknown>): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  patch<T>(url: string, data: unknown): Promise<T>;
  delete(url: string): Promise<void>;
  sendMultipartFormData<T>(url: string, formData: FormData): Promise<T>;
}

export class AxiosHttpClient implements IHttpClient {
  constructor(private readonly client: AxiosInstance) {}

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const res = await this.client.get<T>(url, { params });
    return res.data;
  }
  async post<T>(url: string, data: unknown): Promise<T> {
    const res = await this.client.post<T>(url, data);
    return res.data;
  }
  async patch<T>(url: string, data: unknown): Promise<T> {
    const res = await this.client.patch<T>(url, data);
    return res.data;
  }
  async delete(url: string): Promise<void> {
    await this.client.delete(url);
  }
  async sendMultipartFormData<T>(url: string, formData: FormData): Promise<T> {
    const res = await this.client.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}

export class BaseRemoteDataSource {
  private http: IHttpClient;
  public prefix: string = "";

  constructor(http: IHttpClient) {
    this.http = http;
  }

  private extractRpcError(payload: Record<string, any>) {
    const topError = payload?.error;
    if (typeof topError === "string") {
      return topError;
    }
    if (topError?.error) {
      return topError.error;
    }
    if (topError?.message) {
      return topError.message;
    }

    const resultError = payload?.result?.error;
    if (typeof resultError === "string") {
      return resultError;
    }
    if (resultError?.error) {
      return resultError.error;
    }

    return null;
  }

  protected async rpcCall(method: string, params = {}) {
    const res = await this.http.post<Record<string, any>>(this.prefix, {
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    });
    const rpcError = this.extractRpcError(res);
    if (rpcError) {
      throw new Error(rpcError);
    }
    return res.result?.data;
  }

  protected async rpcMultipartCall(
    path: string,
    method: string,
    params = {},
    file: File,
  ) {
    const formData = new FormData();
    formData.append(
      "rpc",
      JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method,
        params,
      }),
    );
    if (file) {
      formData.append("file", file);
    }

    const res = await this.http.sendMultipartFormData<Record<string, any>>(
      path,
      formData,
    );

    const rpcError = this.extractRpcError(res);
    if (rpcError) {
      throw new Error(rpcError);
    }

    return res.result?.data;
  }
}
