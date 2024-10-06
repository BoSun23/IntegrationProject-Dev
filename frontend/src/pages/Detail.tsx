// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import * as apiClient from "./../api-client";
// import { AiFillStar } from "react-icons/ai";
// import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
// import { useState, useEffect } from "react";
// import { HotelType, RoomType } from "../shared/types"; // Import frontend types

// const Detail = () => {
//   const { hotelId } = useParams();
//   const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null); // Store full room data

//   // Fetch hotel data
//   const { data: hotel } = useQuery<HotelType>(
//     ["fetchHotelById", hotelId],
//     () => apiClient.fetchHotelById(hotelId || ""),
//     {
//       enabled: !!hotelId,
//     }
//   );

//   // Fetch hotel rating
//   const { data: rating, error: ratingError, isLoading: isRatingLoading } = useQuery<number | null>(
//     ["fetchHotelRating", hotelId],
//     () => apiClient.fetchHotelRating(hotelId || ""),
//     {
//       enabled: !!hotelId,
//     }
//   );

//   // Fetch hotel comments
//   const { data: comments, error: commentsError, isLoading: isCommentsLoading } = useQuery<any[]>(
//     ["fetchHotelComments", hotelId],
//     () => apiClient.fetchHotelComments(hotelId || ""),
//     {
//       enabled: !!hotelId,
//     }
//   );

//   // Log errors if any occur
//   useEffect(() => {
//     if (ratingError) {
//       console.error("Error fetching rating:", ratingError);
//     }
//     if (commentsError) {
//       console.error("Error fetching comments:", commentsError);
//     }
//   }, [ratingError, commentsError]);

//   if (isRatingLoading || isCommentsLoading) {
//     return <p>Loading...</p>;
//   }

//   if (!hotel) {
//     return <></>;
//   }

//   const handleRoomSelection = (room: RoomType) => {
//     setSelectedRoom(room); // Store full room data including roomName, price, etc.
//   };

//   const filteredRooms = hotel.rooms.filter((room: RoomType) => !room.isDeleted);

//   return (
//     <div className="space-y-6">
//       <div>
//         <span className="flex">
//           {Array.from({ length: hotel.starRating }).map((_, index) => (
//             <AiFillStar key={index} className="fill-yellow-400" />
//           ))}
//         </span>
//         <h1 className="text-3xl font-bold">{hotel.name}</h1>
//       </div>

//       {/* Hotel Rating */}
//       {rating !== null ? (
//         <div>
//           <h2 className="text-xl font-semibold">Hotel Rating: {rating}/5</h2>
//         </div>
//       ) : (
//         <p>No rating available for this hotel.</p>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {hotel.imageUrls.map((image) => (
//           <div className="h-[300px]" key={image}>
//             <img
//               src={image}
//               alt={hotel.name}
//               className="rounded-md w-full h-full object-cover object-center"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
//         {hotel.facilities.map((facility) => (
//           <div className="border border-slate-300 rounded-sm p-3" key={facility}>
//             {facility}
//           </div>
//         ))}
//       </div>

//       {/* Room Selection with Images */}
//       <div className="h-fit">
//         <h3 className="text-lg font-bold">Select a Room Type</h3>
//         {filteredRooms && filteredRooms.length > 0 ? (
//           <div className="space-y-4">
//             {hotel.rooms.map((room: RoomType) => (
//               <div key={room._id} className="border p-4 rounded">
//                 {/* Room Radio Button */}
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="room"
//                     value={room._id}
//                     onChange={() => handleRoomSelection(room)} // Directly pass the room object
//                     className="form-radio"
//                   />
//                   <span>
//                     {room.roomName} - ${room.pricePerNight} per night
//                   </span>
//                 </label>

//                 {/* Display Room Images */}
//                 {room.images && room.images.length > 0 && (
//                   <div className="grid grid-cols-2 gap-2 mt-2">
//                     {room.images.map((image, index) => (
//                       <img
//                         key={index}
//                         src={image}
//                         alt={`Room ${room.roomName}`}
//                         className="w-full h-40 object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No rooms available for this hotel.</p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
//         <div className="whitespace-pre-line">{hotel.description}</div>
//         <div className="h-fit">
//           {/* Pass selectedRoom's data to GuestInfoForm */}
//           <GuestInfoForm
//             pricePerNight={selectedRoom?.pricePerNight || 0}  // Use selected room's price
//             hotelId={hotel._id}
//             selectedRoomId={selectedRoom?._id || null}
//             selectedRoomName={selectedRoom?.roomName || ""} // Pass roomName here
//           />
//         </div>
//       </div>

//       {/* Hotel Comments */}
//       <div>
//         <h3 className="text-lg font-bold">Comments</h3>
//         {comments && comments.length > 0 ? (
//           <div className="space-y-4">
//             {comments.map((comment) => (
//               <div key={comment._id} className="border p-4 rounded">
            
//                 <p className="text-base">{comment.comment}</p> {/* Display comment text */}
//                 <p className="text-sm text-gray-500">
//                   {new Date(comment.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No comments available for this hotel.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Detail;


import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { useState, useEffect } from "react";
import { HotelType, RoomType } from "../shared/types";

const Detail = () => {
  const { hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const { data: hotel } = useQuery<HotelType>(
    ["fetchHotelById", hotelId],
    () => apiClient.fetchHotelById(hotelId || ""),
    { enabled: !!hotelId }
  );

  const { data: rating } = useQuery<number | null>(
    ["fetchHotelRating", hotelId],
    () => apiClient.fetchHotelRating(hotelId || ""),
    { enabled: !!hotelId }
  );

  const { data: comments } = useQuery<any[]>(
    ["fetchHotelComments", hotelId],
    () => apiClient.fetchHotelComments(hotelId || ""),
    { enabled: !!hotelId }
  );

  if (!hotel) {
    return <p>Loading...</p>;
  }

  const handleRoomSelection = (room: RoomType) => {
    setSelectedRoom(room);
  };

  const filteredRooms = hotel.rooms.filter((room: RoomType) => !room.isDeleted);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start bg-gray-100 shadow-md rounded-lg p-6">
          <div className="w-full lg:w-1/3">
            <h1 className="text-4xl font-bold mb-4">{hotel.name}</h1>
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full h-72 object-cover rounded-lg mb-4"
            />

            {rating !== null ? (
              <div className="text-gray-500 mb-4">
                <strong>Rating:</strong> {rating} / 5
              </div>
            ) : (
              <p>No rating available for this hotel.</p>
            )}

            <div className="text-gray-600 mb-4">{hotel.description}</div>
            <div className="text-gray-500">
              <strong>Location:</strong> {hotel.city}, {hotel.country}
            </div>
            <div className="text-gray-500">
              <strong>Type:</strong> {hotel.type}
            </div>
            <div className="text-gray-500">
              <strong>Star Rating:</strong>{" "}
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400 inline-block" />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/3 pl-7 p-3">
            <h3 className="text-xl font-bold mb-4">Facilities</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
              {hotel.facilities.map((facility) => (
                <div key={facility} className="border border-slate-300 rounded-sm p-3 text-gray-500">
                  {facility}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4">Select a Room Type</h3>
            {filteredRooms.length > 0 ? (
              <div className="space-y-4">
                {filteredRooms.map((room: RoomType) => (
                  <div key={room._id} className="border p-4 rounded-lg shadow-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="room"
                        value={room._id}
                        onChange={() => handleRoomSelection(room)}
                        className="form-radio"
                      />
                      <span className="text-lg">
                        {room.roomName} - ${room.pricePerNight} per night
                      </span>
                    </label>
                    {room.images && room.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {room.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Room ${room.roomName}`}
                            className="w-full h-40 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No rooms available for this hotel.</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <GuestInfoForm
            pricePerNight={selectedRoom?.pricePerNight || 0}
            hotelId={hotel._id}
            selectedRoomId={selectedRoom?._id || null}
            selectedRoomName={selectedRoom?.roomName || ""}
          />
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Comments</h3>
          {comments && comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="border p-4 rounded-lg shadow-sm">
                  <p className="text-base">{comment.comment}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments available for this hotel.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
