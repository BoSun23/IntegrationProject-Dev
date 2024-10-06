import { HotelType } from "../shared/types"
type Props = {
  checkIn: Date | null;
  checkOut: Date | null;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType | undefined;
  selectedRoomName: string;
  pricePerNight: number;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
  selectedRoomName,
  pricePerNight,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">
          {hotel ? `${hotel.name}, ${hotel.city}, ${hotel.country}` : "N/A"}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold">
            {checkIn ? checkIn.toDateString() : "N/A"}
          </div>
        </div>
        <div>
          Check-out
          <div className="font-bold">
            {checkOut ? checkOut.toDateString() : "N/A"}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>

      <div>
        Guests
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>

      <div>
        Selected Room:
        <div className="font-bold">{selectedRoomName}</div>
      </div>
      <div>
        Price Per Night:
        <div className="font-bold">${pricePerNight}</div>
      </div>
      <div>
        Total Price:
        <div className="font-bold">${pricePerNight * numberOfNights}</div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;




