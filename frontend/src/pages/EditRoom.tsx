import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as apiClient from "../api-client";

interface RoomFormData {
  roomName: string;
  sleeps: number;
  pricePerNight: number;
  roomImages?: FileList;
}

const EditRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();  // Ensure roomId is a string
  const navigate = useNavigate(); // Use navigate to redirect after success

  const { data: room, isLoading } = useQuery(
    ["fetchRoomById", roomId],
    () => apiClient.fetchRoomById(roomId!),  // Fetch room details using the roomId
    {
      enabled: !!roomId,
    }
  );

  const { register, handleSubmit, setValue } = useForm<RoomFormData>({
    defaultValues: room,
  });

  useEffect(() => {
    if (room) {
      setValue("roomName", room.roomName);
      setValue("sleeps", room.sleeps);
      setValue("pricePerNight", room.pricePerNight);
    }
  }, [room, setValue]);

  const mutation = useMutation((updatedRoomData: FormData) =>
    apiClient.updateRoom(roomId!, updatedRoomData), {
      onSuccess: () => {
        // Redirect to "My Hotels" page with a success message
        navigate("/my-hotels", { state: { message: "Hotel room edited successfully!" } });
      },
      onError: (error) => {
        console.error("Error updating room:", error);
      }
    }
  );

  const onSubmit = (data: RoomFormData) => {
    const formData = new FormData();

    formData.append("roomName", data.roomName);
    formData.append("sleeps", data.sleeps.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());

    if (data.roomImages) {
      Array.from(data.roomImages).forEach((file) => {
        formData.append("roomImages", file);
      });
    }

    mutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("roomName")}
        placeholder="Room Name"
        required
        className="p-2 border"
      />
      <input
        type="number"
        {...register("sleeps")}
        placeholder="Sleeps"
        required
        className="p-2 border mt-2"
      />
      <input
        type="number"
        {...register("pricePerNight")}
        placeholder="Price per Night"
        required
        className="p-2 border mt-2"
      />
      <input
        type="file"
        {...register("roomImages")}
        multiple
        className="p-2 border mt-2"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 mt-2 rounded"
      >
        Save Room
      </button>
    </form>
  );
};

export default EditRoom;
