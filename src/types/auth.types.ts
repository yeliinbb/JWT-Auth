export type AuthFormData = {
  id: string;
  password: string;
  nickname?: string;
};

export type AuthValidation = {
  all: string;
  id: string;
  password: string;
  nickname?: string;
};

export type UserInfo = {
  avatar: null | string;
  id: string;
  nickname: string;
  success: boolean;
};

export type ProfileInfo = {
  avatar?: File;
  nickname?: string;
};
