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

// type ConfirmAndSignInResponse = {
//   message: string;
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//     is_admin: boolean;
//     tenant?: {
//       id: string;
//       name: string;
//       plan: string;
//     } | null;
//   };
// };
