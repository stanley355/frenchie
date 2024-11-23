export type TVerifySessionResponse = {
  status: string;
  session: TSession;
  accessToken: TAccessToken;
  message: string;
};

type TSession = {
  handle: string;
  userId: string;
  userDataInJWT: Record<string, any>;
  tenantId: string;
  recipeUserId: string;
};

type TAccessToken = {
  token: string;
  expiry: number;
  createdTime: number;
};
