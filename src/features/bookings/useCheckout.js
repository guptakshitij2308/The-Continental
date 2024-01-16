import { useQueryClient } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import { toast } from "react-hot-toast";
export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully checked out.`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => {
      toast.error(`There was an error in checking out.Please try again later.`);
    },
  });

  return { checkout, isCheckingOut };
}
