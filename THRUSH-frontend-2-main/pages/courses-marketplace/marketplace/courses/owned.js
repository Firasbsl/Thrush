import { useAccount, useOwnedCourses } from "../../../../components/MusicCourses/hooks/web3"
import { Button, Message } from "../../../../components/common"
import { OwnedCourseCard } from "../../../../components/MusicCourses/ui/course"
import { BaseLayout } from "../../../../components/common/layout"
import { MarketHeader } from "../../../../components/MusicCourses/ui/marketplace"
import { useRouter } from "next/router"
import Link from "next/link"
import { useWeb3 } from "../../../../components/MusicCourses/providers"
import {useEffect, useState} from "react";
import {courseService} from "../../../../services";
import { getAllCourses } from "../../../../helpers/fetcher"

export default function OwnedCourses({courses}) {
  const router = useRouter()
  const { requireInstall } = useWeb3()
  const { account } = useAccount()

  const [courseData, setCourses] = useState([]);

  //const { ownedCourses } = useOwnedCourses(courses, account.data)
  const { ownedCourses } = useOwnedCourses(courseData, account.data)

  useEffect(() => {

    let isApiSubscribed = true;

    courseService.getAll().then((x) => {
      if (isApiSubscribed) {
        // handle success
        setCourses(x.data.courses);
      }
    });

    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };

  }, []);

  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        { ownedCourses.isEmpty &&
          <div className="w-1/2">
            <Message type="warning">
              <div>You don&apos;t own any courses</div>
              <Link href="/marketplace">
                <a className="font-normal hover:underline">
                  <i>Purchase Course</i>
                </a>
              </Link>
            </Message>
          </div>
        }
        { account.isEmpty &&
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        }
        { requireInstall &&
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        }
        { ownedCourses.data?.map(course =>
          <OwnedCourseCard
            key={course.id}
            course={course}
          >
            <Button
              onClick={() => router.push(`/courses-marketplace/courses/${course.slug}`)}
            >
              Watch the course
            </Button>
          </OwnedCourseCard>
        )}
      </section>
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data,
    },
  };
}

OwnedCourses.Layout = BaseLayout
