import { loadEnvConfig } from "@next/env";

export default async () => {
  loadEnvConfig(process.cwd());
};
