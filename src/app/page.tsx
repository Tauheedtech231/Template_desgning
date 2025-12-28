import { TEMPLATE_MAP } from "./components/templates";

export default function Home() {
  const templateId =
    process.env.NEXT_PUBLIC_TEMPLATE_ID || "1";

  const Template =
    TEMPLATE_MAP[templateId] || TEMPLATE_MAP["1"];

  return <Template />;
}
