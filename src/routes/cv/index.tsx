import { createFileRoute } from "@tanstack/react-router";
import { DocumentPage } from "@/components/document-page";
import { documentHead } from "@/lib/seo";

export const Route = createFileRoute("/cv/")({
  component: CvEn,
  head: () => documentHead("en", "cv"),
});

function CvEn() {
  return <DocumentPage lang="en" kind="cv" />;
}
