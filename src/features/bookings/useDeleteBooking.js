import { useMutation } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success(`Booking is deleted successfully.`);
    },
    onError: (err) => {
      console.error(err);
      toast.error("There was an error deleting the booking.");
    },
  });
  return { deleteBooking, isDeleting };
}
