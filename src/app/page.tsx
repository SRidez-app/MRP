import Image from "next/image";
import Header from "@/Main/Header";
import Hero from "@/Main/Hero";
import Overivew from "@/Main/Overivew";
import ServiceAreas from "@/Main/serviceAreas";
import callToAction from "@/Components/callToAction";
import CallToAction from "@/Components/callToAction";
import footer from "@/Components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Overivew />
      <ServiceAreas />
      <CallToAction />
      <footer />
  
    </>
  );
}