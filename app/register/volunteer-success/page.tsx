import Link from "next/link";

export default function VolunteerSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 px-6">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-emerald-950">Thank you for applying</h1>
        <p className="mt-3 text-gray-600">
          Your volunteer application is waiting for review. We will activate your account after an administrator approves it.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">
          Back to home
        </Link>
      </section>
    </main>
  );
}