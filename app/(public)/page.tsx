import { Cta } from "@/components/ui/home/cta";
import { Faq } from "@/components/ui/home/faq";
import { Hero } from "@/components/ui/home/hero";
import { Stats } from "@/components/ui/home/state";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Faq />
      <Cta />
    </>
  );
}
