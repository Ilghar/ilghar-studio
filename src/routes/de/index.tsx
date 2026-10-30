import { createFileRoute } from "@tanstack/react-router";
import { LinkInBio } from "@/components/link-in-bio";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/de/")({
  component: HomeDe,
  head: () => pageHead("de"),
});

function HomeDe() {
  return <LinkInBio initialLang="de" />;
}
