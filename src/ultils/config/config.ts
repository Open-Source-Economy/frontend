import Joi from "joi";

export enum Env {
  Production = "production",
  Stage = "stage",
  Development = "development",
  Local = "local",
}

const envVarsSchema = Joi.object({
  VITE_ENV: Joi.string()
    .valid(...Object.values(Env))
    .default(Env.Production)
    .description("Environment for the React app"),
  VITE_OSE_API_BASE_URL: Joi.string().uri().required().description("Base URL for the OSE API"),
  VITE_OSE_API_API_VERSION: Joi.string().required().description("API version for the OSE API"),
  VITE_OSE_API_USE_MOCK: Joi.boolean().default(false).description("Boolean flag to determine whether to use mock API"),
}).unknown();

// @ts-ignore
const viteEnv = import.meta.env;
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(viteEnv);

if (error) {
  console.error(`Config validation error: ${error.message}`);
}

interface ApiConfig {
  url: string;
  apiVersion: string;
  useMock: boolean;
}

interface Config {
  api: ApiConfig;
  env: Env;
}

export const config: Config = {
  env: envVars.VITE_ENV as Env,
  api: {
    url: `${envVars.VITE_OSE_API_BASE_URL}/${envVars.VITE_OSE_API_API_VERSION}`,
    apiVersion: envVars.VITE_OSE_API_API_VERSION,
    useMock: envVars.VITE_OSE_API_USE_MOCK,
  },
};
