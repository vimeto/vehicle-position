import qs from 'qs';
import { ApiResponseStatus, ApiResponse, PureApiResponse, defaultMetadata } from './types';

const getOriginUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return window.location.origin;
  }

  return 'http://localhost:3000';
};

const jsonRequestHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

class Api {
  readonly origin = getOriginUrl();

  getNetworkErrorResponse<DataType>(): ApiResponse<DataType> {
    return {
      data: {} as DataType,
      errors: ['api.response.messages.errors.no_response'],
      notices: [],
      status: 503,
      statusText: 'Service Unavailable',
      result: ApiResponseStatus.Failure,
      metadata: defaultMetadata,
    };
  }

  getInitializedResponseDataType<DataType>(
    response: PureApiResponse<DataType>,
    result: ApiResponseStatus = ApiResponseStatus.Success,
  ): ApiResponse<DataType> {
    return {
      data: {} as DataType,
      errors: [],
      notices: [],
      result: result,
      status: 200,
      statusText: '',
      metadata: defaultMetadata,
      ...response,
    } as ApiResponse<DataType>;
  }

  async get<DataType>(uri: string, setLoading: (value: boolean) => void, params = {}): Promise<ApiResponse<DataType>> {
    const extendedparams = { ...params, "format": "json" };

    const extendedUri = this.extendUri(uri, extendedparams);
    setLoading(true);
    let response: Response;
    try {
      response = await fetch(extendedUri, {
        method: HttpMethod.Get,
        headers: jsonRequestHeaders,
        credentials: 'include',
      });
    } catch (error) {
      setLoading(false);

      return this.getNetworkErrorResponse<DataType>();
    }

    const result = this.getInitializedResponseDataType<DataType>(
      await this.getResponseBody<DataType>(response),
      this.getResponseResult(response),
    );
    setLoading(false);

    return result;
  }

  async post<DataType>(uri: string, body = {}): Promise<ApiResponse<DataType>> {
    const extendedUri = this.extendUri(uri);
    const response = await fetch(extendedUri, {
      method: HttpMethod.Post,
      headers: jsonRequestHeaders,
      body: JSON.stringify(body),
      credentials: 'include',
    });

    return this.getInitializedResponseDataType<DataType>(
      await this.getResponseBody<DataType>(response),
      this.getResponseResult(response),
    );
  }

  async put<DataType>(uri: string, params = {}): Promise<ApiResponse<DataType>> {
    const extendedUri = this.extendUri(uri, params);
    const response = await fetch(extendedUri, {
      method: HttpMethod.Put,
      headers: jsonRequestHeaders,
      body: JSON.stringify(params),
      credentials: 'include',
    });

    return this.getInitializedResponseDataType<DataType>(
      await this.getResponseBody<DataType>(response),
      this.getResponseResult(response),
    );
  }

  async delete<DataType>(uri: string): Promise<ApiResponse<DataType>> {
    const extendedUri = this.extendUri(uri);
    const response = await fetch(extendedUri, {
      method: HttpMethod.Delete,
      headers: jsonRequestHeaders,
      credentials: 'include',
    });

    return this.getInitializedResponseDataType<DataType>(
      await this.getResponseBody<DataType>(response),
      this.getResponseResult(response),
    );
  }

  extendUri(uri: string, params = {}): string {
    const query = qs.stringify({ ...params }, { arrayFormat: 'brackets' });
    const extendedUri = `${this.origin}${uri}?${query}`;

    return extendedUri;
  }

  getResponseBody = async <DataType>(response: Response): Promise<ApiResponse<DataType>> => {
    const parsedBody = await this.extractJsonBody<DataType>(response);
    if (!this.isResponseSuccessful(response)) {
      parsedBody.result = ApiResponseStatus.Failure;
      parsedBody.statusText = response.statusText;
      parsedBody.status = response.status;
    }

    return parsedBody;
  };

  extractJsonBody = async <DataType>(response: Response): Promise<ApiResponse<DataType>> => {
    try {
      const json = await response.json();
      if (json.data) return json as ApiResponse<DataType>;

      return { data: json } as ApiResponse<DataType>;
    } catch (error) {
      return {
        data: {} as DataType,
        errors: ['api.response.messages.errors.json_parse'],
        result: ApiResponseStatus.Failure,
      } as ApiResponse<DataType>;
    }
  };

  isResponseSuccessful = (response: Response): boolean => {
    return response.status >= 200 && response.status < 300;
  };

  getResponseResult = (response: Response): ApiResponseStatus => {
    if (this.isResponseSuccessful(response)) {
      return ApiResponseStatus.Success;
    }

    return ApiResponseStatus.Failure;
  };
}

export default Api;
