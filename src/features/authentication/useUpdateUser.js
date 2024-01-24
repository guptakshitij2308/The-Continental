import { useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth.js";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User updated successfully.");
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}
