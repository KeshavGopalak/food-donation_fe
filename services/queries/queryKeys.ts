export const queryKeys = {
  admin: {
    users: ["admin", "users"] as const,
  },
  donations: {
    all: ["donations"] as const,
    count: ["donations", "count"] as const,
    nearby: ["donations", "nearby"] as const,
    byDonor: (donorId: string) => ["donations", "donor", donorId] as const,
    pendingPickup: ["donations", "pending-pickup"] as const,
  },
};