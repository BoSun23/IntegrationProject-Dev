import { useForm } from "react-hook-form";

export type RoomFormData = {
  roomName: string;
  sleeps: number;
  pricePerNight: number;
  roomImages: FileList;
};

const RoomForm = ({ onSave }: { onSave: (formData: FormData) => void }) => {
  const { register, handleSubmit } = useForm<RoomFormData>();

  const onSubmit = (data: RoomFormData) => {
    const formData = new FormData();
    formData.append("roomName", data.roomName);
    formData.append("sleeps", data.sleeps.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());
    Array.from(data.roomImages).forEach((file) => {
      formData.append("roomImages", file);
    });
    onSave(formData); // Send the form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
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
        required
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

export default RoomForm;
