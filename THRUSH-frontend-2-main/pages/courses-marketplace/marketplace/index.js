import { CourseCard, CourseList } from "../../../components/MusicCourses/ui/course";
import { BaseLayout } from "../../../components/common/layout";
import { getAllCourses } from "../../../helpers/fetcher";
import {
  useOwnedCourses,
  useWalletInfo,
} from "../../../components/MusicCourses/hooks/web3";
import { Button, LoaderEth } from "../../../components/common";
import { OrderModal } from "../../../components/MusicCourses/ui/order";
import { useEffect, useState } from "react";
import { MarketHeader } from "../../../components/MusicCourses/ui/marketplace";
import { useWeb3 } from "../../../components/MusicCourses/providers";
import { withToast } from "../../../utils/toast";
import { Navbar } from "../../../components/common";
import { courseService } from "../../../services";

export default function Marketplace({ courses }) {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [busyCourseId, setBusyCourseId] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const [courseData, setCourses] = useState([]);

  //const { ownedCourses } = useOwnedCourses(courses, account.data);
  const { ownedCourses } = useOwnedCourses(courseData, account.data);

  console.log("owned courses", ownedCourses);

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

  const purchaseCourse = async (order, course) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id);
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    const value = web3.utils.toWei(String(order.price));

    setBusyCourseId(course.id);
    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );

      withToast(_purchaseCourse({ hexCourseId, proof, value }, course));
    } else {
      withToast(_repurchaseCourse({ courseHash: orderHash, value }, course));
    }
  };

  const _purchaseCourse = async ({ hexCourseId, proof, value }, course) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });

      ownedCourses.mutate([
        ...ownedCourses.data,
        {
          ...course,
          proof,
          state: "purchased",
          owner: account.data,
          price: value,
        },
      ]);
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const _repurchaseCourse = async ({ courseHash, value }, course) => {
    try {
      const result = await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: account.data, value });

      const index = ownedCourses.data.findIndex((c) => c.id === course.id);

      if (index >= 0) {
        ownedCourses.data[index].state = "purchased";
        ownedCourses.mutate(ownedCourses.data);
      } else {
        ownedCourses.mutate();
      }
      return result;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const cleanupModal = () => {
    setSelectedCourse(null);
    setIsNewPurchase(true);
  };

  return (
    <>
      <Navbar />
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => {
          const owned = ownedCourses.lookup[course.id];
          console.log("courses", courses);
          return (
            <CourseCard
              key={course.id}
              course={course}
              state={owned?.state}
              disabled={!hasConnectedWallet}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      Install
                    </Button>
                  );
                }

                if (isConnecting) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      <LoaderEth size="sm" />
                    </Button>
                  );
                }

                if (!ownedCourses.hasInitialResponse) {
                  return (
                    // <div style={{height: "42px"}}></div>
                    <Button variant="white" disabled={true} size="sm">
                      {hasConnectedWallet ? "Loading State..." : "Connect"}
                    </Button>
                  );
                }

                const isBusy = busyCourseId === course.id;
                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button
                          onClick={() => alert("You are owner of this course.")}
                          disabled={false}
                          size="sm"
                          variant="white"
                        >
                          Yours &#10004;
                        </Button>
                        {owned.state === "deactivated" && (
                          <div className="ml-1">
                            <Button
                              size="sm"
                              disabled={isBusy}
                              onClick={() => {
                                setIsNewPurchase(false);
                                setSelectedCourse(course);
                              }}
                              variant="purple"
                            >
                              {isBusy ? (
                                <div className="flex">
                                  <LoaderEth size="sm" />
                                  <div className="ml-2">In Progress</div>
                                </div>
                              ) : (
                                <div>Fund to Activate</div>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }

                return (
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    size="sm"
                    disabled={!hasConnectedWallet || isBusy}
                    variant="lightPurple"
                  >
                    {isBusy ? (
                      <div className="flex">
                        <LoaderEth size="sm" />
                        <div className="ml-2">In Progress</div>
                      </div>
                    ) : (
                      <div>Purchase</div>
                    )}
                  </Button>
                );
              }}
            />
          );
        }}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          isNewPurchase={isNewPurchase}
          onSubmit={(formData, course) => {
            purchaseCourse(formData, course);
            cleanupModal();
          }}
          onClose={cleanupModal}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
