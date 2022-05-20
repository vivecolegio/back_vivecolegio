export interface IContext {
  user: {
    authorization: any;
    iat: any;
    exp: any;
    sub: any;
  };
  geo: any;
  requestedUrl: any;
}
