import SearchFilter from "../../_component/searchFilter";

export default function HeroProperty() {
  return (
    <section className="relative w-full">
      <div className="bg-black h-87.25">
        <div className="app-container">
          <div className="flex justify-center items-center flex-col pb-9.5 pt-17">
            <h1 className="font-bold text-[50px]">Our Properties</h1>
            <p className="font-normal text-[18px] text-[#C8C8C8] text-center">
              Discover premium, secure, and affordable homes built and delivered
              directly <br /> by Greatway Properties.
            </p>
          </div>
        </div>
      </div>
      <SearchFilter display="search" />
    </section>
  );
}
