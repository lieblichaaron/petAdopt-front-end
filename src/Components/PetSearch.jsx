import CustomNavbar from "./Navbar";
const Search = () => {
  return (
    <div>
      {/* only show if signed in */}
      {true && <CustomNavbar />}
    </div>
  );
};

export default Search;
