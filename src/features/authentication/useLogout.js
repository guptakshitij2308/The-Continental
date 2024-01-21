import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Successfully logged out.");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
