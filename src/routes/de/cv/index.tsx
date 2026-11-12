import { createFileRoute } from "@tanstack/react-router";
import { DocumentPage } from "@/components/document-page";
import { documentHead } from "@/lib/seo";

export const Route = createFileRoute("/de/cv/")({
  component: CvDe,
  head: () => documentHead("de", "cv"),
});

function CvDe() {
  return <DocumentPage lang="de" kind="cv" />;
}
