import { Cta } from "@/components/ui/home/cta";
import { Faq } from "@/components/ui/home/faq";
import { Hero } from "@/components/ui/home/hero";
import { ProjectWorkflow } from "@/components/ui/home/workflow";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectWorkflow />
      <Faq />
      <Cta />
    </>
  );
}
