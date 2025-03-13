import Footer from "@/components/Footer";
import ProductPage from "@/components/ProductPage";
import Navbar from "@/components/sections/navbar/default";
import { getSingleProduct } from "@/lib/GetProducts";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const { id } = params;

  try {
    const product = await getSingleProduct(id);

    if (!product) {
      notFound();
    }

    return (
      <>
        <ProductPage product={product} />
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
};

export default page;
