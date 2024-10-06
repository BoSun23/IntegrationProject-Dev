// import { useEffect, useState } from "react";
// import { useMutation, useQuery } from "react-query";
// import { Link, useLocation } from "react-router-dom";
// import * as apiClient from "../api-client";
// import RoomForm from "../forms/RoomForm";

// const MyHotels = () => {
//   const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels);
//   const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
//   const location = useLocation();  // To read the state passed from the EditRoom

//   // Read the success message from location state
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (location.state?.message) {
//       setSuccessMessage(location.state.message);
//     }
//   }, [location.state]);

//   const handleAddRoomClick = (hotelId: string) => {
//     setSelectedHotelId(hotelId); // Set the selected hotel ID to add a room
//   };

//   const handleRoomSave = async (formData: FormData) => {
//     try {
//       await apiClient.addRoomToHotel(selectedHotelId!, formData); // API call to add room
//       setSelectedHotelId(null); // Close the form after saving
//     } catch (error) {
//       console.error("Error saving room:", error);
//     }
//   };

//   const deleteHotelMutation = useMutation((hotelId: string) =>
//     apiClient.softDeleteHotel(hotelId) // Soft delete hotel
//   );

//   const deleteRoomMutation = useMutation((roomId: string) =>
//     apiClient.softDeleteRoom(roomId) // Soft delete room
//   );

//   const handleDeleteHotel = (hotelId: string) => {
//     if (window.confirm("Are you sure you want to delete this hotel?")) {
//       deleteHotelMutation.mutate(hotelId, {
//         onSuccess: () => {
//           window.location.reload(); // Reload after deletion
//         }
//       });
//     }
//   };

//   const handleDeleteRoom = (roomId: string) => {
//     console.log('Deleting room with ID:', roomId);
//     if (window.confirm("Are you sure you want to delete this room?")) {
//       deleteRoomMutation.mutate(roomId, {
//         onSuccess: () => {
//           window.location.reload(); // Reload after deletion
//         },
//         onError: (error) => {
//           console.error("Error deleting room:", error);
//         },
//       });
//     }
//   };

//   if (!hotelData) {
//     return <span>No Hotels found</span>;
//   }

//   return (
//     <div className="space-y-5">
//       {successMessage && (
//         <div className="bg-green-100 text-green-700 p-4 rounded">
//           {successMessage}
//         </div>
//       )}
//       <span className="flex justify-between">
//         <h1 className="text-3xl font-bold">My Hotels</h1>
//         <Link
//           to="/add-hotel"
//           className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
//         >
//           Add Hotel
//         </Link>
//       </span>
//       <div className="grid grid-cols-1 gap-8">
//         {hotelData.map((hotel) => (
//           <div
//             key={hotel._id}
//             data-testid="hotel-card"
//             className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
//           >
//             <h2 className="text-2xl font-bold">{hotel.name}</h2>
//             <div className="whitespace-pre-line">{hotel.description}</div>
//             <button
//               onClick={() => handleDeleteHotel(hotel._id)}
//               className="bg-red-600 text-white p-2 mt-2 rounded"
//             >
//               Delete Hotel
//             </button>
//             <div className="grid grid-cols-5 gap-2">
//               <div className="border border-slate-300 rounded-sm p-3 flex items-center">
//                 {hotel.city}, {hotel.country}
//               </div>
//               <div className="border border-slate-300 rounded-sm p-3 flex items-center">
//                 {hotel.type}
//               </div>
//               <div className="border border-slate-300 rounded-sm p-3 flex items-center">
//                 {hotel.starRating} Star Rating
//               </div>
//             </div>
//             <span className="flex justify-end">
//               <Link
//                 to={`/edit-hotel/${hotel._id}`}
//                 className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
//               >
//                 Edit Hotel Details
//               </Link>
//             </span>

//             {/* Add Room Button */}
//             <button
//               onClick={() => handleAddRoomClick(hotel._id)}
//               className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
//             >
//               Add Room
//             </button>

//             {/* RoomForm appears when the selected hotel matches */}
//             {selectedHotelId === hotel._id && <RoomForm onSave={handleRoomSave} />}

//             {/* Display list of rooms for this hotel */}
//             <div className="mt-4">
//               <h3 className="text-lg font-bold">Rooms</h3>
//               {hotel.rooms && hotel.rooms.length > 0 ? (
//                 <ul>
//                   {hotel.rooms.map((room) => (
//                     <li key={room._id} className="border p-2 mt-2">
//                       {room.roomName}
//                       <div>
//                         Sleeps: {room.sleeps}
//                       </div>
//                       <div>
//                         ${room.pricePerNight} per night
//                       </div>
//                       <div className="h-[300px]">
//                         <img
//                           src={room.images[0]}
//                           className="w-full h-full object-cover object-center"
//                         />
//                       </div>
//                       <span className="flex justify-end">
//                         <Link
//                           to={`/edit-room/${room._id}`}  // Correct room edit link with room._id
//                           className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
//                         >
//                           Edit Room Details
//                         </Link>
//                       </span>
//                       <button
//                         onClick={() => handleDeleteRoom(room._id)}
//                         className="bg-red-600 text-white p-1 ml-4 rounded"
//                       >
//                         Delete Room
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No rooms available for this hotel.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyHotels;

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import * as apiClient from "../api-client";
import RoomForm from "../forms/RoomForm";

const MyHotels = () => {
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);
  const location = useLocation();  // To read the state passed from the EditRoom

  // Read the success message from location state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const handleAddRoomClick = (hotelId: string) => {
    setSelectedHotelId(hotelId); // Set the selected hotel ID to add a room
  };

  const handleRoomSave = async (formData: FormData) => {
    try {
      await apiClient.addRoomToHotel(selectedHotelId!, formData); // API call to add room
      setSelectedHotelId(null); // Close the form after saving
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const deleteHotelMutation = useMutation((hotelId: string) =>
    apiClient.softDeleteHotel(hotelId) // Soft delete hotel
  );

  const deleteRoomMutation = useMutation((roomId: string) =>
    apiClient.softDeleteRoom(roomId) // Soft delete room
  );

  const handleDeleteHotel = (hotelId: string) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      deleteHotelMutation.mutate(hotelId, {
        onSuccess: () => {
          window.location.reload(); // Reload after deletion
        }
      });
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    console.log('Deleting room with ID:', roomId);
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteRoomMutation.mutate(roomId, {
        onSuccess: () => {
          window.location.reload(); // Reload after deletion
        },
        onError: (error) => {
          console.error("Error deleting room:", error);
        },
      });
    }
  };

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  // Filter out soft-deleted hotels and rooms
  const filteredHotels = hotelData.map(hotel => ({
    ...hotel,
    rooms: hotel.rooms.filter(room => !room.isDeleted)  // Only filter rooms, not hotels
  }));

  return (
    <div className="container mx-auto px-6 py-8">
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage My Listing</h1>
        <Link
          to="/add-hotel"
          className="bg-black text-white text-xl font-bold py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          + Add New Hotel
        </Link>
      </div>

      <div className="space-y-8">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel._id}
            data-testid="hotel-card"
            className="flex items-start bg-gray-100 shadow-md rounded-lg p-6"
          >
            <div className="w-1/3">
              <h2 className="text-4xl font-semibold mb-4">{hotel.name}</h2>
              <img
                src={hotel.imageUrls[0]}  // Assuming you have an image for the hotel
                alt={hotel.name}
                className="w-full h-full object-cover rounded-lg"
              />

              <div className="mb-4">
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                <div className="text-gray-500">
                  <strong>Location:</strong> {hotel.city}, {hotel.country}
                </div>
                <div className="text-gray-500">
                  <strong>Type:</strong> {hotel.type}
                </div>
                <div className="text-gray-500">
                  <strong>Rating:</strong> {hotel.starRating} Stars
                </div>
              </div>

              <div className="flex justify-between items-center">
              <button
                  onClick={() => handleAddRoomClick(hotel._id)}
                  className="bg-[#ADD8E6] text-white text-lg py-2 px-4 rounded hover:bg-[#87CEEB] transition"
                >
                  Add Room
                </button>
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="border border-[#ADD8E6] text-[#ADD8E6] text-lg py-2 px-4 rounded hover:bg-[#ADD8E6] hover:text-white transition"
                >
                  Edit Hotel
                </Link>
                <button
                  onClick={() => handleDeleteHotel(hotel._id)}
                  className="bg-gray-300 text-black text-lg py-2 px-4 rounded hover:bg-gray-400 transition"
                >
                  Delete Hotel
                </button>
                
              </div>
            </div>

            <div className="w-2/3 pl-7 p-3">
              {/* RoomForm appears when the selected hotel matches */}
              {selectedHotelId === hotel._id && <RoomForm onSave={handleRoomSave} />}

              <div>
                <h3 className="text-xl font-bold">Rooms</h3>
                {hotel.rooms && hotel.rooms.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {hotel.rooms.map((room) => (
                      <li key={room._id} className="border p-4 rounded-lg shadow-sm">
                        
                        <h4 className="text-2xl font-semibold mb-4">{room.roomName}</h4>
                        <div className="text-gray-500">
                           <strong>Sleeps:</strong> {room.sleeps}
                        </div>
                        
                        <div className="text-gray-500"><strong>Price per night:</strong> ${room.pricePerNight}</div>
                        <div className="mt-4">
                          <img
                            src={room.images[0]}
                            alt={room.roomName}
                            className="w-full h-48 object-cover rounded"
                          />
                        </div>
                        <div className="flex justify-between mt-4">
                          <Link
                            to={`/edit-room/${room._id}`}
                            className="border border-[#ADD8E6] text-[#ADD8E6] text-lg py-1 px-3 rounded hover:bg-[#ADD8E6] hover:text-white transition"
                          >
                            Edit Room
                          </Link>
                          <button
                            onClick={() => handleDeleteRoom(room._id)}
                            className="bg-gray-300 text-black text-lg py-1 px-3 rounded hover:bg-gray-400 transition"
                          >
                            Delete Room
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No rooms available for this hotel.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
