import EditAddressPage from "@/components/EditAddress";
import Footer from "@/components/Footer";

const page = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <EditAddressPage id={id} />
      <Footer />
    </>
  );
};

export default page;
