import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default async function RegisterPage({ searchParams }: PageProps<"/register">) {
  const query = await searchParams;
  const role = typeof query.role === "string" ? query.role : undefined;

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/">
              <Image src="/logo.svg" alt="naano" width={96} height={28} className="h-7 w-auto" />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Create your account</h1>
          <p className="mt-1 mb-6 text-sm text-[#6B7280]">Start running creator campaigns, or start earning.</p>
          <RegisterForm presetRole={role} />
          <p className="mt-6 text-center text-xs text-[#6B7280]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#2563eb]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center p-12 text-white lg:flex" style={{ background: "#2563eb" }}>
        <div className="max-w-sm">
          <h2 className="mb-4 text-3xl font-bold">Join the marketplace.</h2>
          <p className="text-blue-100">
            Brands book vetted LinkedIn creators at a fixed price per post. Creators get paid within 24h.
          </p>
        </div>
      </div>
    </div>
  );
}
