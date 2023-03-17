import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import PeopleReviewCard from "../../components/OLCard/PeopleReviewCard";

const Review = ({ clinic }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  async function fetchData() {
    if (session && clinic) {
      const res = await fetch(`${process.env.url}/review/match/${clinic._id}`);
      const reviews = await res.json();
      if (reviews) {
        setReviews(reviews);
      }
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if(!clinic){
        return router.push("/noClinic");
      }
      fetchData();
    }
  }, [status]);

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
          <div className=" pt-6 xl:px-24 px-10 grid grid-cols-1 md:px-12 md:grid md:grid-cols-1 lg:flex gap-10 xl:grid xl:grid-cols-3">
            {reviews.map(
              ({ _id, customerName, comments, score, createdAt }) => (
                <div className="" key={_id}>
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
                          คลินิกของคุณยังไม่มีรีวิว
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
};

export default Review;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.url}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinic = await res.json();
      if (!clinic) {
        return router.push("/noClinic");
      }
      return { props: { clinic } };
    } catch (error) {
      console.log("error: ", error);
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}
