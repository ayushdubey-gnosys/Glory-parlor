import React from "react";
import { getAvatarUrl } from "../../utils/avatar";
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
    <div className="min-h-screen bg-[#faf9f5] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-[#D68B2A]/5 border border-[#D68B2A]/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* IMAGE SIDE */}
            <div className="lg:col-span-5 relative h-[400px] lg:h-auto">
              <img
                src={course.image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="flex gap-3">
                  <span className="bg-[#D68B2A] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    {course.level}
                  </span>
                  <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg ${course.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {course.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT SIDE */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              
              <h4 className="text-[#D68B2A] font-semibold tracking-[0.2em] uppercase text-sm mb-3">
                Academy Course
              </h4>
              
              <h1 className="text-4xl md:text-5xl font-light text-zinc-900 mb-6 leading-tight">
                {course.name}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-[#faf9f5] p-5 rounded-2xl border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Fees</p>
                  <p className="text-2xl font-bold text-[#D68B2A]">₹{course.fees}</p>
                </div>
                <div className="bg-[#faf9f5] p-5 rounded-2xl border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-xl font-bold text-zinc-800">{course.duration?.value} {course.duration?.type}</p>
                </div>
                <div className="bg-[#faf9f5] p-5 rounded-2xl border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Category</p>
                  <p className="text-xl font-bold text-zinc-800 capitalize">{course.category}</p>
                </div>
                <div className="bg-[#faf9f5] p-5 rounded-2xl border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Batch Size</p>
                  <p className="text-xl font-bold text-zinc-800">{course.batchSize} Students</p>
                </div>
              </div>

              {/* INQUIRY BUTTON */}
              {!hasRole(["admin", "superadmin"]) && (
                <div className="mt-auto">
                  {(!user || user?.role === "customer") ? (
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate(`/register?redirect=/academy/${course._id}`);
                          return;
                        }
                        navigate("/inquiries/create", {
                          state: {
                            inquiryType: "course",
                            serviceInterest: course.name,
                          },
                        });
                      }}
                      className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#D68B2A] to-[#b57321] hover:scale-105 transition-all shadow-xl shadow-[#D68B2A]/30 text-white rounded-full font-semibold text-lg"
                    >
                      Inquire Now
                    </button>
                  ) : (
                    <p className="text-gray-400 italic">Staff can only view this course.</p>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* LOWER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* SYLLABUS */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl shadow-[#D68B2A]/5 border border-[#D68B2A]/10">
            <h3 className="text-2xl font-light text-zinc-900 mb-8 border-b border-gray-100 pb-4">
              Course <span className="font-bold text-[#D68B2A]">Syllabus</span>
            </h3>
            
            {course.syllabus?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.syllabus.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] h-[20px] rounded-full bg-[#D68B2A]/20 flex items-center justify-center text-[#D68B2A]">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <p className="text-gray-700 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No syllabus detailed yet.</p>
            )}
          </div>

          {/* INSTRUCTOR */}
          {course.instructor && (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-[#D68B2A]/5 border border-[#D68B2A]/10 flex flex-col items-center text-center">
              <h3 className="text-xl font-light text-zinc-900 mb-8 w-full border-b border-gray-100 pb-4 text-left">
                Course <span className="font-bold text-[#D68B2A]">Instructor</span>
              </h3>
              
              <img 
                src={getAvatarUrl(course.instructor)} 
                alt={course.instructor?.name} 
                className="w-32 h-32 rounded-full object-cover border-4 border-[#D68B2A]/20 shadow-lg mb-6"
              />
              
              <h4 className="text-2xl font-bold text-zinc-900 capitalize mb-2">{course.instructor?.name}</h4>
              <p className="text-[#D68B2A] uppercase tracking-widest text-xs font-semibold mb-6">{course.instructor?.role || 'Expert'} Instructor</p>
              
              <p className="text-gray-500 text-sm italic line-clamp-4">
                {course.instructor?.description || "A professional instructor dedicated to teaching you the best techniques and skills in the industry."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;