import Image from "next/image";
import Link from "next/link";
import { AnimateKeyframes } from "react-simple-animate";

export default function Card({ course, disabled, Footer, state }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="flex h-full">
        <div className="next-image-wrapper h-full flex-1">
          <Image
            className={`object-cover ${disabled && "grayscale filter"}`}
            src={course.coverImage}
            layout="responsive"
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
        <div className="flex-2 p-8 pb-4">
          <div className="flex items-center">
            <div className="mr-2 text-sm font-semibold uppercase tracking-wide text-orange-500">
              {course.type}
            </div>
            <div>
              {state === "activated" && (
                <div className="rounded-full bg-green-200 p-1 px-3 text-xs text-black">
                  Activated
                </div>
              )}
              {state === "deactivated" && (
                <div className="rounded-full bg-red-200 p-1 px-3 text-xs text-black">
                  Deactivated
                </div>
              )}
              {state === "purchased" && (
                <AnimateKeyframes
                  play
                  duration={2}
                  keyframes={["opacity: 0.2", "opacity: 1"]}
                  iterationCount="infinite"
                >
                  <div className="rounded-full bg-yellow-200 p-1 px-3 text-xs text-black">
                    Bought
                  </div>
                </AnimateKeyframes>
              )}
            </div>
          </div>

          <Link href={`/courses-marketplace/courses/${course.slug}`}>
            <a className="mt-1 block h-12 text-sm font-medium leading-tight text-black hover:underline sm:text-base">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 mb-4 text-sm text-gray-500 sm:text-base">
            {course.description.substring(0, 70)}...
          </p>
          {Footer && (
            <div className="mt-2">
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
