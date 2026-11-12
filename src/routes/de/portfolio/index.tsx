import { createFileRoute } from "@tanstack/react-router";
import { DocumentPage } from "@/components/document-page";
import { documentHead } from "@/lib/seo";

export const Route = createFileRoute("/de/portfolio/")({
  component: PortfolioDe,
  head: () => documentHead("de", "portfolio"),
});

function PortfolioDe() {
  return <DocumentPage lang="de" kind="portfolio" />;
}
