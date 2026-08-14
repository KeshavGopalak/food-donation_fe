import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authServices";
import { RegisterResponse, RegisterPayload } from "@/types/authTypes";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: authService.Register,
    onSuccess: (data) => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      router.push("/login");
    },
  });
};