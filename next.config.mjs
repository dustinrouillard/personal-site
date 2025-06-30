import { withPlausibleProxy } from "next-plausible";

export default withPlausibleProxy({
  scriptName: "app",
  customDomain: "https://trck.dstn.to",
})({
  experimental: {
    reactCompiler: true,
  },
});
