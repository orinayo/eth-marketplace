import Address from "@components/Home/Address";
import Breadcrumb from "@components/Home/Breadcrumb";
import CourseCard from "@components/Home/CourseCard";
import Footer from "@components/Home/Footer";
import Hero from "@components/Home/Hero";
import Navbar from "@components/Home/Navbar";
import OrderInfo from "@components/Home/OrderInfo";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            <Hero />
            <Breadcrumb />
            <Address />
            <OrderInfo />
            <CourseCard />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
