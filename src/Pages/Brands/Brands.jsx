import useBrands from "./../../Components/Hooks/useBrands";

export default function Brands() {
  let { data, isError, error, isLoading } = useBrands();

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return (
      <>
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="brands relative">
        <div className="brands-logo">
          {data.map((brand) => (
            <img src={brand.image} alt={brand.name} />
          ))}
          {data.map((brand) => (
            <img src={brand.image} alt={brand.name} />
          ))}
        </div>
      </div>
    </>
  );
}
