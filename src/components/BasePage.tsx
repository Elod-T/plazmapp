import Footer from "./Footer";
import Header from "./Header";

const BasePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto w-[300px] xs:w-[450px] sm:w-[620px] md:w-[760px] mg:w-[800px] lg:w-[1100px] xl:w-[1100px] 2xl:w-[1280px]">
        <div className="mx-auto w-fit">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default BasePage;
