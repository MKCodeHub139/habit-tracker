import { useMutation, useQuery } from "@apollo/client/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/analytics/headerCards/useGetUser";
import { IoIosAdd } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { LogoutUser } from "../../graphql/mutations";
import logo from '../../assets/habitbridge-logo-white.svg';
const Nav = () => {
  const handleLogout = async () => {
    const res = await Logout_User({ variables: { id: user?.getUser?.id } });
    let confirmed =confirm('Are you sure you want to logout')
    if(confirmed && res){
        navigate("/login");
    }
  };
  const { user } = useGetUser();
  const [Logout_User] = useMutation(LogoutUser);
  const navigate = useNavigate();
  return (
    <div className="main text-[#FFFFFF] sticky top-0 h-[3rem] flex items-center z-40">
      <nav className="flex justify-evenly items-center container mx-auto  bg-[#FF5722] rounded-2xl mt-2 p-1">
        <div className="logo">
          <h1 className="text-2xl h-[2.6rem] flex items-center">
            <Link><img src={logo} alt="logo" className="h-[3.7rem]"/></Link>
          </h1>
        </div>
        <ul>
          {user ? (
            <li className="flex items-center gap-5">
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-[#FFC107]  border-[#F9AFAF] hover:bg-[#f1b707]"
                      : ""
                  } text-4xl cursor-pointer border-2 hover:bg-[#FFC107]  hover:border-[#F9AFAF] rounded-full px-3`
                }
              >
                <IoIosAdd />
              </NavLink>

              <p className="flex items-center gap-2 text-xl">
                <FaUserCircle />
                {user?.getUser?.name}
              </p>

              <button
                className="cursor-pointer border-2 bg-orange-600 hover:bg-orange-700 hover:border-fuchsia-100 rounded-full py-1 px-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <div className="btns flex gap-4 h-[100%]">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#FFC107]  border-0"
                        : ""
                    } cursor-pointer border-2 hover:bg-[#f1b707]  hover:border-0 rounded-full py-1 px-3`
                  }
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#FFC107]  border-fuchsia-100"
                        : ""
                    } cursor-pointer border-2 hover:bg-[#f1b707]  hover:border-0 rounded-full py-1 px-3`
                  }
                >
                  Login
                </NavLink>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
