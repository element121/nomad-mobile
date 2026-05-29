import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        search: "",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        search: "",
      },
    ],
  },
};
