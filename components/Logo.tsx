import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  function goToCoffeeShop() {
    const tableId = sessionStorage.getItem("currentTableId");

    if (tableId) {
      navigate(`/table/${tableId}`);
    } else {
      navigate("/");
    }
  }
  return (
    <img
      onClick={goToCoffeeShop}
      src="/logo.png"
      className="w-36 cursor-pointer sm:w-44"
      alt="Kissa Mori"
    />
  );
};

export default Logo;
