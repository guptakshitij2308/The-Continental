import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("You have been successfully logged in.");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { login, isLoggingIn };
}
