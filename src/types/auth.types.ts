export type RegisterInfo = {
  id: string;
  password: string;
  nickname: string;
};

export type LoginInfo = Omit<RegisterInfo, 'nickname'>;

export type ProfileInfo = {
  avatar: string;
  nickname: string;
};
