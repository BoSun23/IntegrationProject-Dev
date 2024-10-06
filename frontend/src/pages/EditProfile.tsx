import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type EditProfileFormData = {
  firstName: string;
  lastName: string;
};

const EditProfile = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  // Fetch the current user data
  const { data: user, isLoading} = useQuery("currentUser", apiClient.fetchCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>();

  // Use useEffect to reset the form values after the user data is loaded
  useEffect(() => {
    if (user) {
      reset({ firstName: user.firstName, lastName: user.lastName });
    }
  }, [user, reset]);

  const mutation = useMutation(apiClient.updateProfile, {
    onSuccess: () => {
      showToast({ message: "Profile updated successfully!", type: "SUCCESS" });
      navigate("/my-profile");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Edit Profile</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        First Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("firstName", { required: "First Name is required" })}
        />
        {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Last Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("lastName", { required: "Last Name is required" })}
        />
        {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
      >
        Update Profile
      </button>
    </form>
  );
};

export default EditProfile;
