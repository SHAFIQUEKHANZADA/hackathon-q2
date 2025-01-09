import BeautifulProduct from "@/components/BeautifulProduct";
import Furniture from "@/components/Furniture";
import Hero from "@/components/Hero";
import Latest from "@/components/Latest";
import OurProduct from "@/components/OurProduct";
 
import Range from "@/components/Range";

export default function Home() {
  return (
    <div>
    <Hero/>
    <Range/>
    <OurProduct/>
    <BeautifulProduct/>
    <Latest/>
    <Furniture/>
    </div>
  );
}
