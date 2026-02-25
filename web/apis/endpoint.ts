export const AUTH_ENDPOINTS = {
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign_up",
  CHECK_AUTH: "/auth/check-auth",
};

export const USER_ENDPOINTS = {
  UPDATE_PROFILE: "/user/update-profile",
};

export const MESSAGE_ENDPOINTS = {
  GET_USERS: "/message/users",
  GET_MESSAGES: (receiverId: string) => `/message/${receiverId}`,
  SEND_MESSAGE: "/message/send",
};
