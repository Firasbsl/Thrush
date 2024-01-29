import Link from "next/link";

export default function Hero() {
  return (
    <section className="lg:2/6 my-28 text-left">
      <div className="text-6xl font-semibold leading-none text-gray-900">
        Grow your career as a musician
      </div>
      <div className="text-true-gray-500 mt-6 text-xl font-light antialiased">
        Learn music and instruments the easy way! Get exclusive access
        to artists courses.
      </div>
      <div className="mt-5 flex sm:mt-8 lg:justify-start">
        <div className="rounded-md shadow">
          <Link href={"/courses-marketplace/marketplace"}>
            <a
              href=""
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700 md:py-4 md:px-10 md:text-lg"
            >
              Get Started
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
