import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully checked in.`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: () => {
      toast.error(`There was an error in checking in.Please try again later.`);
    },
  });

  return { checkin, isCheckingIn };
}
