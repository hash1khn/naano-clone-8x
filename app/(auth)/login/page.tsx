import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const query = await searchParams;
  const reauth = query.reauth === "1";

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/">
              <Image src="/logo.svg" alt="naano" width={96} height={28} className="h-7 w-auto" />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">Welcome back</h1>
          <p className="mt-1 mb-6 text-sm text-[#6B7280]">Sign in to your account</p>
          <LoginForm reauth={reauth} />
          <p className="mt-6 text-center text-xs text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-[#2563eb]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center p-12 text-white lg:flex" style={{ background: "#2563eb" }}>
        <div className="max-w-sm">
          <h2 className="mb-4 text-3xl font-bold">Welcome back.</h2>
          <p className="text-blue-100">Sign in to manage your campaigns, creators and payouts, all in one place.</p>
        </div>
      </div>
    </div>
  );
}
