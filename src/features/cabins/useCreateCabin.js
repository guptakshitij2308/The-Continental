import { createEditCabin } from "../../services/apiCabins.js";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin has been created successfully.");
      queryClient.invalidateQueries({
        queryKeys: ["cabins"],
      });
      //   reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createCabin, isCreating };
}
