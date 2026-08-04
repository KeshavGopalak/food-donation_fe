import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router"; // or "next/navigation" depending on your Next.js version
import { authService } from "@/services/authServices"; // adjust import path as needed
import { RegisterResponse, RegisterPayload } from "@/types/authTypes"; // adjust import path as needed

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: authService.Register,
    onSuccess: (data) => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Invalidate relevant queries in TanStack cache
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Navigate to login
      
    },
  });
};