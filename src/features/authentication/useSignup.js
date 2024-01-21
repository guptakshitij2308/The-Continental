import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth.js";
import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      //   console.log(user);
      toast.success(
        "User signed up successfully.Please verify the respective email address."
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
}
