import fs from "fs-extra";
import path from "path";
import os from "os";
import { ApiConfig } from "./api";

export const load_config = async (): Promise<ApiConfig> => {
  const home = os.homedir();
  const baseConfigDir = path.resolve(`${home}/.config/kirbic`);
  const config = await fs.readJSON(path.join(baseConfigDir, "config.json"));
  const creds = await fs.readJSON(path.join(baseConfigDir, "creds.json"));
  return {
    shop_id: config.shop_default.slug,
    access_token: creds.access_token,
  };
};
