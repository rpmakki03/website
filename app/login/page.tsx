import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header, { LotusMark } from "@/components/Header";

export const metadata: Metadata = {
  title: "Login · LearnGeeta — Swarnim Varg",
  description: "Sign in to the LearnGeeta 50th Golden Batch competitions portal.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-1">
        {/* ——— left panel (desktop) ——— */}
        <aside className="relative hidden w-[44%] overflow-hidden bg-navy-900 lg:block">
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-30">
            <Image
              src="/assets/mandala-navy.jpeg"
              alt=""
              width={900}
              height={1090}
              className="mask-feather w-[720px] max-w-none"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
          <div className="relative flex h-full flex-col items-center justify-center px-12 text-center">
            <p className="text-sm tracking-[0.35em] text-gold-300 uppercase">॥ स्वर्णिम वर्ग ॥</p>
            <h1 className="font-display mt-4 text-5xl font-semibold leading-tight text-cream-50">
              The <span className="text-goldgrad font-bold">Golden Batch</span>
              <br /> awaits you
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-100/65">
              Sign in to register for the 50th batch competitions — Geeta Chitrakala,
              Geeta Swar, Gyan Challenge, Geeta Expression and Vivechan Reel.
            </p>
            <blockquote className="mt-12 border-t border-gold-500/30 pt-8">
              <p className="font-display text-xl text-gold-200">
                “योगः कर्मसु कौशलम्”
              </p>
              <p className="mt-2 text-[11px] tracking-[0.2em] text-cream-100/50 uppercase">
                Excellence in action is yoga · Geeta 2.50
              </p>
            </blockquote>
          </div>
        </aside>

        {/* ——— form panel ——— */}
        <section className="flex flex-1 items-center justify-center bg-cream-50 px-4 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
          <div className="w-full max-w-md">
            <div className="rounded-[1.75rem] border border-gold-500/25 bg-white p-6 shadow-[0_30px_70px_-30px_rgba(16,31,92,0.35)] sm:rounded-[2rem] sm:p-10">
              <Image
                src="/assets/logo-50-golden-batch.png"
                alt="LearnGeeta 50 — Golden Batch"
                width={300}
                height={262}
                priority
                className="mx-auto w-36 sm:w-44"
              />
              <h2 className="font-display mt-4 text-center text-[28px] font-bold text-navy-900 sm:text-3xl">
                Welcome back
              </h2>
              <p className="mt-2 text-center text-sm text-navy-900/60">
                Sign in to join the Swarnim Varg competitions
              </p>

              {/* LearnGeeta SSO */}
              <button
                type="button"
                className="mt-7 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-navy-800 px-6 text-[15px] font-bold text-cream-50 shadow-[0_16px_40px_-16px_rgba(16,31,92,0.8)] transition-all hover:bg-navy-700 hover:shadow-[0_18px_45px_-14px_rgba(16,31,92,0.9)]"
              >
                <LotusMark className="h-6 w-6" />
                Login using LearnGeeta
              </button>
              <p className="mt-2.5 text-center text-[11px] text-navy-900/45">
                Single sign-on with your existing LearnGeeta account
              </p>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-navy-900/10" />
                <span className="text-xs font-medium tracking-[0.15em] text-navy-900/40 uppercase">or</span>
                <span className="h-px flex-1 bg-navy-900/10" />
              </div>

              {/* email form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold tracking-wide text-navy-800 uppercase">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-navy-900/15 bg-cream-50 px-4 py-3.5 text-base text-navy-900 placeholder:text-navy-900/35 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 sm:text-sm"
                  />
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="password" className="block text-xs font-semibold tracking-wide text-navy-800 uppercase">
                      Password
                    </label>
                    <a href="#" className="text-xs font-medium text-gold-600 hover:text-gold-700">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-navy-900/15 bg-cream-50 px-4 py-3.5 text-base text-navy-900 placeholder:text-navy-900/35 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-goldgrad min-h-[54px] w-full rounded-full px-6 text-[15px] font-bold text-navy-900 shadow-[0_14px_35px_-12px_rgba(185,130,28,0.85)] transition-transform active:scale-[0.98] sm:hover:scale-[1.02]"
                >
                  Sign In
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-sm text-navy-900/60">
              New to the Golden Batch?{" "}
              <Link href="/" className="font-semibold text-gold-600 hover:text-gold-700">
                Explore the celebration →
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
