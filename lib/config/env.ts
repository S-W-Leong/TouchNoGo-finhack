import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  APP_URL: z.string().default("http://localhost:3000"),
  APP_INTERNAL_TOKEN: z.string().default("change-me"),
  NEXT_PUBLIC_APP_MODE: z.string().default("seeded"),
  ALIBABA_MODELSTUDIO_API_KEY: z.string().optional(),
  ALIBABA_MODEL: z.string().default("qwen3.6-flash"),
  ALIBABA_BASE_URL: z.string().default(
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
  ),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_MESSAGING_SERVICE_SID: z.string().optional(),
  TWILIO_WHATSAPP_FROM: z.string().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;

let cachedEnv: AppEnv | null = null;

export function getEnv() {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }

  return cachedEnv;
}

export function isSeedMode() {
  return getEnv().NEXT_PUBLIC_APP_MODE === "seeded";
}

export function canAttemptTwilioSend() {
  const env = getEnv();
  return Boolean(
    env.TWILIO_ACCOUNT_SID &&
      env.TWILIO_AUTH_TOKEN &&
      env.TWILIO_MESSAGING_SERVICE_SID &&
      env.TWILIO_WHATSAPP_FROM,
  );
}

export function canAttemptAlibaba() {
  return Boolean(getEnv().ALIBABA_MODELSTUDIO_API_KEY);
}
