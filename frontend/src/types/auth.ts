export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  tenant_id: string;
  plan: string;
};

export type LoginUser = {
  password: string;
  email: string;
};

export type SignupUser = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  tenant: string;
  plan: string;
};

export type UpdatePasswordUser = {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
};
