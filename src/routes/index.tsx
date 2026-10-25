import { createFileRoute } from "@tanstack/react-router";
import { LinkInBio } from "@/components/link-in-bio";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => pageHead("en"),
});

function Home() {
  return <LinkInBio />;
}
