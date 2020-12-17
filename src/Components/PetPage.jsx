import CustomNavbar from "./Navbar";
import { useContext } from "react";
import { PetContext } from "../Context";
const PetPage = () => {
  const pet = useContext(PetContext);
  return (
    <div>
      <CustomNavbar />
      <h1>{pet.name}</h1>
    </div>
  );
};

export default PetPage;
