import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <HashLoader color="#171717" loading size={40} />
    </div>
  );
};

export default Loader;
