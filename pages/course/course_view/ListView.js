import React from "react";
import HoverCard from "../../../components/common/HoverCard";

function ListView({ courseData }) {
  return (
    <div className="overflow-scroll overflow-y-auto space-y-10">
      {courseData?.map((course) => (
        <HoverCard
          name={course.courseName}
          amount={course.amount}
          duration={course.duration}
          totalPrice={course.totalPrice}
          procedures={course.procedures}
        />
      ))}
    </div>
  );
}

export default ListView;
