import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"; 
import SignOutButton from "./SignOutButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the icons you need

const Header = () => {
  const { isLoggedIn, userRole } = useAppContext();

  console.log("User Role:", userRole);

  return (
    <div className="bg-[#ADD8E6] py-5">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/">Stay.com</Link>
          
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
                
              {userRole === "hotel" ? (
                <Link
                  className="flex items-center text-black px-3 font-bold hover:text-[#F5F5F7]"
                  to="/my-hotels"
                >
                  Hotels
                </Link>
              ) : (
                <Link
                  className="flex items-center text-black px-3 font-bold hover:text-[#F5F5F7]"
                  to="/my-bookings"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  Bookings
                </Link>
              )}
              <Link
                  className="flex items-center text-black px-3 font-bold hover:text-[#F5F5F7]"
                  to="/My-profile"
                >
                  <FontAwesomeIcon icon={faUser} className="text-1xl" />
                
                   Profile
                  
                </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-[#F5F5F7]"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
