/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-var */
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Homepage = () => {
  const localStorageItem = localStorage.getItem("newhorizon_user") ?? "";
  const user: any = JSON.parse(localStorageItem) ?? {};
  var today = new Date();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-48 items-center flex-col space-y-3">
        <h1 className="text-5xl  font-bold">
          Hey, {user?.firstName + " " + user?.lastName}
        </h1>
        <h3 className="text-3xl ">Welcome back</h3>
        <p>
          Today :{" "}
          {today.toLocaleDateString("en-IN", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              localStorage.removeItem("newhorizon_user");
              window.location.reload();
              navigate("/login");
            }}
            className="inline-flex items-center rounded-md border mb-6 border-transparent bg-indigo-700 px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
