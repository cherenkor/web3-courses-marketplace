export interface IOrder {
  price: string;
    email: string;
    confirmationEmail: string
}

export const initialOrder: IOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};
