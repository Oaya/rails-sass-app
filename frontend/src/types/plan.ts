export type Plan = {
  id: string;
  name: string;
  features: {
    project_number: string;
    member: string;
  };
  price: string;
};
