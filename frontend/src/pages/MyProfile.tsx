import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const MyProfile = () => {
  const navigate = useNavigate();

  // Fetch user data using react-query's useQuery hook
  const { data: user, isLoading } = useQuery("currentUser", apiClient.fetchCurrentUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">My Profile</h1>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">First Name:</span>
            <span>{user?.firstName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Last Name:</span>
            <span>{user?.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-medium">Role:</span>
            <span className="capitalize">{user?.role}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
          >
            Edit My Profile
          </button>
          <button
            onClick={handleResetPassword}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
