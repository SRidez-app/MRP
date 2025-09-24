import Image from "next/image";
import Header from "@/Main/Header";
import Hero from "@/Main/Hero";
import Overivew from "@/Main/Overivew";
import ServiceAreas from "@/Main/serviceAreas";
import CallToAction from "@/Components/callToAction";

import Footer from "@/Components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Overivew />
      <ServiceAreas />
      <CallToAction />
      <Footer />
  
    </>
  );
}