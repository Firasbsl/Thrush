import {
  useAccount,
  useOwnedCourse,
} from "../../../components/MusicCourses/hooks/web3";
import { useWeb3 } from "../../../components/MusicCourses/providers";
import { Message, Modal } from "../../../components/common";
import {
  CourseHero,
  Curriculum,
  Keypoints,
} from "../../../components/MusicCourses/ui/course";
import { BaseLayout } from "../../../components/common/layout";4
import { useEffect, useState } from "react";
import { getAllCourses } from "../../../helpers/fetcher";
import { courseService } from "../../../services";

export default function Course({ course }) {
  const [coursesData, setCourses] = useState([]);

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

  //const courseData = coursesData.filter((c) => c.slug === params.slug)[0];

  const { isLoading } = useWeb3();
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;
  // const courseState = "deactivated"

  const isLocked =
    !courseState ||
    courseState === "purchased" ||
    courseState === "deactivated";

  return (
    <>
      <div className="py-4">
        <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className="mx-auto max-w-5xl">
          {courseState === "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for the activation. Process can
              take up to 24 hours.
              <i className="block font-normal">
                In case of any questions, please contact info@eincode.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message type="success">
              Thrush wishes you happy watching of the course.
            </Message>
          )}
          {courseState === "deactivated" && (
            <Message type="danger">
              Course has been deactivated, due the incorrect purchase data. The
              functionality to watch the course has been temporaly disabled.
              <i className="block font-normal">
                Please contact info@thrush.com
              </i>
            </Message>
          )}
        </div>
      )}
      <Curriculum
        isLoading={isLoading}
        locked={isLocked}
        courseState={courseState}
      />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
