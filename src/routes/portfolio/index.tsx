import { createFileRoute } from "@tanstack/react-router";
import { DocumentPage } from "@/components/document-page";
import { documentHead } from "@/lib/seo";

export const Route = createFileRoute("/portfolio/")({
  component: PortfolioEn,
  head: () => documentHead("en", "portfolio"),
});

function PortfolioEn() {
  return <DocumentPage lang="en" kind="portfolio" />;
}
