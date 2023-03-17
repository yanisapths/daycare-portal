import React from "react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";

function PeopleReviewCard({
  imageUrl,
  customerName,
  comments,
  createdAt,
  score,
}) {
  const ratingStar = {
    size: 30,
    value: score,
    edit: false,
    isHalf: true,
  };

  return (
    <div className="w-full h-fit translation hover:shadow-lg rounded-2xl lg:p-8 p-2 pb-4 bg-white lg:w-[450px] lg:h-[250px]">
      <div className="flex items-center space-x-4">
        {!imageUrl && (
          <>
          <Image
              className="rounded-full cursor-pointer"
              src="/Avatar.png"
              alt="/Avatar.png"
              width="60"
              height="60"
            />
          </>
        )}
        {imageUrl && (
          <>
            {imageUrl && (
              <div>
                <Image
                alt="/Avatar.png"
                className="rounded-full cursor-pointer"
                src={imageUrl}
                width="60"
                height="60"
              />
              </div>
              
            )}
          </>
        )}
        <div className="">
          <p className="text-[#121212]/50">ลูกค้า</p>
          <p className="text-[#121212]/50">
            รีวิวเมื่อ: {new Date(createdAt).toDateString("en-EN")}
          </p>
        </div>
      </div>
      <div className="items-center mb-1  ">
        <div className=" pt-2">
          <ReactStars {...ratingStar} />
        </div>
        <p className="text-base xxl:text-lg  px-2 ">{comments}</p>
      </div>
    </div>
  );
}

export default PeopleReviewCard;
