"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDatabaseMessage } from "@/services/dashboardServices";

export default function DatabasePage() {
  const router = useRouter();
  const { data: message, isError } = useQuery({
    queryKey: ["database", "message"],
    queryFn: getDatabaseMessage,
  });

  if (isError) {
    router.replace("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Database (Protected)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{message ?? "Loading..."}</p>
        </CardContent>
      </Card>
    </div>
  );
}
