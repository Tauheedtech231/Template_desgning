import { TEMPLATE_MAP } from "./components/templates"; 

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {

  const params = await searchParams; // 👈 IMPORTANT
  const templateId = params.template || "2"; // default template = 1

  const Template = TEMPLATE_MAP[templateId] || TEMPLATE_MAP["1"];

  return <Template />;
}
