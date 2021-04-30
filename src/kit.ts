import { get_api, ApiConfig } from "./api";
import { Endpoints } from "@kirbic/types";
import { AxiosError, AxiosInstance } from "axios";

export type Cart = Endpoints["GET /cart/"]["response"]["data"];

export type Price = Endpoints["GET /catalog/product/"]["response"]["data"]["items"][0]["prices"][0];
export type Currency = Price["currency"];
export type Unit = Price["unit_type"];
export type CartActionMode = Endpoints["PATCH /cart/{mode}/{price_id}"]["parameters"]["mode"];
export type ProductCreateParams = Endpoints["POST /catalog/product/"]["parameters"];
export type Product = Endpoints["POST /catalog/product/"]["response"]["data"];

export type OrderCreate = Endpoints["POST /order/"]["parameters"];
export type Order = Endpoints["POST /order/"]["response"]["data"];

export type AddPayment = Endpoints["POST /payment/add-payment"]["parameters"];
export type Payment = Endpoints["POST /payment/add-payment"]["response"]["data"];

export const api_error = async <T>(arg0: T): Promise<T> => {
  try {
    return await arg0;
  } catch (error) {
    if (error.isAxiosError) {
      const e: AxiosError = error;
      console.error(`❌ Kirbic API Error [${e.response?.status}]`);
      console.error(e.response?.data);
    } else {
      console.log("❌ Kirbic API Error");
    }
    throw error;
  }
};

export class KirbicApiKit {
  api: AxiosInstance;
  constructor(config: ApiConfig) {
    this.api = get_api(config);
  }

  get_cart = async () => {
    const res = await this.api.get<Cart>("/cart");
    return res.data;
  };

  set_metadata = async (metadata: Record<string, unknown>) => {
    const res = await this.api.post<Cart>("/cart/metadata/", metadata);
    return res.data;
  };

  cart_action_api = async (
    mode: CartActionMode,
    price_id: string,
    quantity: number
  ) => {
    const res = await this.api.patch<Cart>(`/cart/${mode}/${price_id}`, {
      quantity,
    });
    return res.data;
  };

  delete_cart = async () => {
    await this.api.delete("/cart/");
  };

  create_product = async (data: ProductCreateParams) => {
    const product = await this.api.post<Product>("/catalog/product", data);
    return product.data;
  };

  delete_all = async () => {
    const product = await this.api.post("/catalog/product/delete_all");
    return product.data;
  };

  create_order = async (data: OrderCreate) => {
    const order = await this.api.post<Order>("/order", data);
    return order.data;
  };

  add_payment = async (data: AddPayment) => {
    const payment = await this.api.post<Payment>("/payment/add-payment", data);
    return payment.data;
  };

  static create(config: ApiConfig) {
    return new KirbicApiKit(config);
  }
}
