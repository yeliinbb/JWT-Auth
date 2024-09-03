export type ProfileInfo = {
  avatar: string;
  nickname: string;
};

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
