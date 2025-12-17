export type AddMemberUser = {
  email: string;
  first_name: string;
  last_name: string;
  tenant_id: string;
};

export type InviteUser = {
  invitation_token: string;
  password: string;
  password_confirmation: string;
};
