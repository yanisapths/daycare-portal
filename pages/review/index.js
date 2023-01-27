import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import PeopleReviewCard from "../../components/OLCard/PeopleReviewCard";

const Review = ({ user }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  const [clinicData, setData] = useState({});

  async function fetchData() {
    const url = `${process.env.dev}/clinic/owner/${user.id}`;
    if (user.id) {
      const res = await fetch(url);
      try {
        const clinicData = await res.json();
        if (clinicData) {
          setData(clinicData);
          const res = await fetch(
            `${process.env.dev}/review/match/${clinicData._id}`
          );
          const reviews = await res.json();
          if (reviews) {
            setReviews(reviews);
          }
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
    } else {
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData();
    }
  }, [status]);

  if (clinicData) {
    return (
      <div>
        <Head>
          <title>Clinic | Review </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <div className="divide-y divide-[#A17851] divide-opacity-30">
          <Header />
          <div className="main">
            <div className="pageTitle">รีวิวและคะแนนจากลูกค้า</div>
            <div className=" lg:flex xl:grid xl:grid-cols-3 p-12">
              {reviews.map(
                ({ _id, customerName, comments, score, createdAt }) => (
                  <div className="mx-auto gap-10 pb-8 lg:px-4" key={_id}>
                    {reviews ? (
                      <div className="" key={_id}>
                        <PeopleReviewCard
                          customerName={customerName}
                          comments={comments}
                          score={score}
                          createdAt={createdAt}
                        />
                      </div>
                    ) : (
                      <div className="mx-4 space-y-4">
                        <div className="py-12">
                          <p className="h4 text-black/50 pt-8">
                            This clinic has no review yet.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return router.push("/noClinic");
  }
};

export default Review;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  const { user } = session;
  return {
    props: { user },
  };
}
