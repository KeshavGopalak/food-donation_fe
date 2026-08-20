export const displayRole = (role?: string) => role ? role.charAt(0).toUpperCase() + role.slice(1) : "Donor";
export const initials = (name?: string) => (name || "User").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
export const formatDate = (date?: string) => date ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date)) : "Not available";
