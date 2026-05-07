import React from "react";

import { useCourses } from "../../services/academy/useAuthQuery";
import { renderValue } from "../../utils/helpers";

const AcademyPage = () => {
  const { data, isLoading } = useCourses();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Academy Courses</h1>

      <div className="grid grid-cols-3 gap-5">
        {data?.map((course) => (
          <div key={course._id} className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold">{renderValue(course.name)}</h2>

            <p className="text-gray-500 mt-2">{renderValue(course.description)}</p>

            <div className="mt-4">
              <p>Price: ₹{renderValue(course.price)}</p>

              <p>Duration: {renderValue(course.duration)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademyPage;