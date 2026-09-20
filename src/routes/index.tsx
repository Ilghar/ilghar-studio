import { createFileRoute } from "@tanstack/react-router";
import { LinkInBio } from "@/components/link-in-bio";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Ilghar Dadgostari — queer-feminist curator, designer and sculptor based in Berlin. Links to studio, BLADE Festival, LinkedIn, and more.",
      },
    ],
  }),
});

function Home() {
  return <LinkInBio />;
}
