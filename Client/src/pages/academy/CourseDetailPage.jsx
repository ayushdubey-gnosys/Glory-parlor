import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCourse } from "../../services/academy/useAuthQuery";

import { useAuth } from "../../context/AuthProvider";

import { useEnrollCourse } from "../../services/academy/useAcademyMutation";
import Loader from "../../components/common/Loader";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // HOOKS ALWAYS AT TOP
  const { user, hasRole } = useAuth();

  const enrollMutation = useEnrollCourse();

  const { data, isLoading } = useCourse(id);

  // LOADING
  if (isLoading) {
    return <Loader />;
  }

  // NOT FOUND
  if (!data) {
    return (
      <div className="p-10 text-xl">
        Course not found
      </div>
    );
  }

  const course = data;

  // CHECK ENROLLMENT
  const isEnrolled =
    user &&
    course.enrolledStudents &&
    course.enrolledStudents.some(
      (student) =>
        String(student._id || student) ===
        String(user._id)
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

          {/* IMAGE */}
          <div>
            <img
              src={
                course.image ||
                "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
              }
              alt={course.name}
              className="w-full h-[350px] object-cover rounded-2xl"
            />
          </div>

          {/* CONTENT */}
          <div>

            {/* STATUS */}
            <div className="flex items-center gap-3 mb-4">

              <span className="bg-zinc-900 text-white text-sm px-4 py-1 rounded-full capitalize">
                {course.level}
              </span>

              <span
                className={`text-sm px-4 py-1 rounded-full ${
                  course.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {course.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl font-bold text-gray-900">
              {course.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mt-5 leading-8 text-lg whitespace-pre-line">
              {course.description}
            </p>

            {/* COURSE INFO */}
            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-500">
                  Fees
                </span>

                <span className="font-semibold text-lg">
                  ₹{course.fees}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-500">
                  Duration
                </span>

                <span className="font-semibold">
                  {course.duration?.value}{" "}
                  {course.duration?.type}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-semibold capitalize">
                  {course.category}
                </span>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-500">
                  Batch Size
                </span>

                <span className="font-semibold">
                  {course.batchSize} Students
                </span>
              </div>
            </div>

            {/* INSTRUCTOR */}
            {course.instructor && (
              <div className="mt-8 bg-gray-50 rounded-2xl p-5 border border-gray-200">

                <h3 className="font-bold text-lg mb-4">
                  Instructor
                </h3>

                <div className="flex items-center gap-4">

                  <img
                    src={
                      course.instructor?.profilePic
                    }
                    alt={
                      course.instructor?.name
                    }
                    className="w-16 h-16 rounded-full object-cover border"
                  />

                  <div>

                    <p className="font-semibold text-lg">
                      {
                        course.instructor?.name
                      }
                    </p>

                    <p className="text-gray-500 capitalize">
                      {
                        course.instructor?.role
                      }{" "}
                      Instructor
                    </p>

                    <span
                      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full capitalize ${
                        course.instructor?.status ===
                        "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        course.instructor?.status
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SYLLABUS */}
        <div className="px-8 pb-8">

          <h2 className="text-2xl font-bold mb-5">
            Course Syllabus
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">

            {/* PARAGRAPH FORMAT */}
            <p className="text-gray-700 leading-8 text-lg whitespace-pre-line">
              {course.syllabus?.join(". ")}.
            </p>
          </div>
        </div>

        {/* INQUIRY ACTION BUTTON */}
        <div className="px-8 pb-8">

          {!hasRole([
            "admin",
            "superadmin",
          ]) && (
            <div className="mt-4">

              {user?.role === "customer" ? (
                <button
                  onClick={() =>
                    navigate("/inquiries/create", {
                      state: {
                        inquiryType: "course",
                        serviceInterest: course.name,
                      },
                    })
                  }
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Course Inquiry
                </button>
              ) : (
                <div className="text-gray-500">
                  Staff can only view this course.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;