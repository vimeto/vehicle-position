interface ApiNotificationTranslationParams {
  object_class_name: string;
  id: number;
  name: string;
}

type ApiNotification = {
  key: string;
  [translationParamKey: string]: ApiNotificationTranslationParams[] | string;
} | string;

export enum ApiResponseStatus {
  Failure = 'failure',
  Success = 'success',
  Unknown = 'unknown',
}
export const defautMetadata = {
  page: 0,
  per_page: 0,
  total_entries: 0,
  total_pages: 0,
};
export interface Metadata {
  page: number;
  per_page: number;
  total_entries: number;
  total_pages: number;
}

export const defaultMetadata = {
  page: 1,
  per_page: 50,
  total_entries: 100,
  total_pages: 10,
};
export type ApiResponse<DataType> = {
  data: DataType;
  errors: ApiNotification[];
  notices: ApiNotification[];
  result: ApiResponseStatus;
  status: number;
  statusText?: string;
  metadata: Metadata;
};

export type PureApiResponse<DataType> = {
  data?: DataType;
  errors?: ApiNotification[];
  notices?: ApiNotification[];
  result?: ApiResponseStatus;
  status?: number;
  statusText?: string;
};

export enum EndpointUrl {
  getItems = '/items',
  userSettings = '/users',
  getAutocompleteLocations = '/items/autocomplete_location_name_from_search',
  getItemTypes = '/item_types',
}
