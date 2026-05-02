type ConfigSchema = {
  baseUrl: string;
};

const config: ConfigSchema = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL  || "",
};

export default config;
