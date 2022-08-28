enum PagePath {
  Root = '/',
  Login = '/login',
  Users = '/users',
  UnAuthorizedRoute = '/',
}

enum ApiPath {
  ItemDetail = '/items/:id',
  ItemExport = '/items/export',
  ItemCreation = '/items/new',
  ItemEdit = '/items/:id/edit',
  ItemDelete = '/items/:id/delete',
  ItemExportSelected = '/items/export',
  ItemsImages = '/items/:id/list_images',
  LocationDetail = '/locations/:id',
  ImportedFile = '/admin/imported_files/:id',
  ImportContent = '/imported_files/:id/import',
}

type RouterPathOptions = {
  routeParams?: Record<string, string | number>;
  urlParams?: Record<string, unknown>;
  format?: string;
};

type NavigateFunction = <State = never>(path: PagePath | string, options?: RouterPathOptions, state?: State) => void;

export { PagePath, RouterPathOptions, NavigateFunction, ApiPath };
