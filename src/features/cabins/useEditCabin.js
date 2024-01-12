import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import { toast } from "react-hot-toast";
export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin has been edited successfully.");
      queryClient.invalidateQueries({ queryKeys: ["cabins"] });
    },
  });

  return { editCabin, isEditing };
}
