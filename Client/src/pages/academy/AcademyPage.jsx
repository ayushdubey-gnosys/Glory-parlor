// pages/academy/AcademyPage.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useCourses } from "../../services/academy/useAuthQuery";
import { useStaff } from "../../services/staff/useStaffQuery";

import {
  useCreateCourse,
  useDeleteCourse,
  useUpdateCourse,
} from "../../services/academy/useAcademyMutation";

import { useAuth } from "../../context/AuthProvider";
import { renderValue } from "../../utils/helpers";

const AcademyPage = () => {
  const { hasRole } = useAuth();

  const { data, isLoading } = useCourses();

  const { data: staffList = [] } =
    useStaff();

  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const createMutation =
    useCreateCourse();

  const updateMutation =
    useUpdateCourse();

  const deleteMutation =
    useDeleteCourse();

  const [form, setForm] = useState({
    name: "",
    description: "",
    fees: 0,
    durationValue: 1,
    durationType: "weeks",
    instructor: "",
    category: "makeup",
    level: "beginner",
    syllabus: "",
    batchSize: 10,
    isActive: true,
    imageFile: null,
  });

  const startEdit = (course) => {
    setEditing(course);

    setForm({
      name: course.name || "",
      description:
        course.description || "",
      fees: course.fees || 0,

      durationValue:
        course.duration?.value || 1,

      durationType:
        course.duration?.type ||
        "weeks",

      instructor:
        course.instructor?._id ||
        course.instructor ||
        "",

      category:
        course.category || "makeup",

      level:
        course.level || "beginner",

      syllabus: (
        course.syllabus || []
      ).join(", "),

      batchSize:
        course.batchSize || 10,

      isActive:
        course.isActive !== undefined
          ? course.isActive
          : true,

      imageFile: null,
    });

    setShowForm(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", form.name);

    fd.append(
      "description",
      form.description
    );

    fd.append(
      "fees",
      String(form.fees)
    );

    fd.append(
      "durationValue",
      String(form.durationValue)
    );

    fd.append(
      "durationType",
      form.durationType
    );

    if (form.instructor) {
      fd.append(
        "instructor",
        form.instructor
      );
    }

    fd.append(
      "category",
      form.category
    );

    fd.append("level", form.level);

    fd.append(
      "syllabus",
      form.syllabus || ""
    );

    fd.append(
      "batchSize",
      String(form.batchSize)
    );

    fd.append(
      "isActive",
      form.isActive ? "true" : "false"
    );

    if (form.imageFile) {
      fd.append(
        "image",
        form.imageFile
      );
    }

    if (editing) {
      updateMutation.mutate({
        id: editing._id,
        data: fd,
      });
    } else {
      createMutation.mutate(fd);
    }

    setShowForm(false);

    setEditing(null);

    setForm({
      name: "",
      description: "",
      fees: 0,
      durationValue: 1,
      durationType: "weeks",
      instructor: "",
      category: "makeup",
      level: "beginner",
      syllabus: "",
      batchSize: 10,
      isActive: true,
      imageFile: null,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete course?"))
      return;

    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Academy Courses
            </h1>

            <p className="text-gray-500 mt-2">
              Manage academy courses and
              training programs
            </p>
          </div>

          {hasRole([
            "admin",
            "superadmin",
          ]) && (
              <button
                onClick={() => {
                  setShowForm((s) => !s);
                  setEditing(null);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
              >
                New Course
              </button>
            )}
        </div>

        {/* FORM */}
        {showForm && (
          <form
            onSubmit={submit}
            className="bg-white rounded-3xl p-6 shadow-sm mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Course name"
                className="border border-gray-300 rounded-xl px-4 py-3"
                required
              />

              <input
                value={form.fees}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fees: e.target.value,
                  })
                }
                type="number"
                placeholder="Course fees"
                className="border border-gray-300 rounded-xl px-4 py-3"
                required
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                placeholder="Course description"
                className="border border-gray-300 rounded-xl px-4 py-3 md:col-span-2"
                rows={4}
              />

              <input
                value={form.durationValue}
                onChange={(e) =>
                  setForm({
                    ...form,
                    durationValue:
                      e.target.value,
                  })
                }
                type="number"
                placeholder="Duration value"
                className="border border-gray-300 rounded-xl px-4 py-3"
              />

              <select
                value={form.durationType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    durationType:
                      e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3"
              >
                <option value="days">
                  Days
                </option>

                <option value="weeks">
                  Weeks
                </option>

                <option value="months">
                  Months
                </option>

                <option value="years">
                  Years
                </option>
              </select>

              <select
                value={form.instructor}
                onChange={(e) =>
                  setForm({
                    ...form,
                    instructor:
                      e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Instructor
                </option>

                {staffList?.map((s) => (
                  <option
                    key={s._id}
                    value={s._id}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3"
              >
                <option value="makeup">
                  Makeup
                </option>

                <option value="hair">
                  Hair
                </option>

                <option value="skin">
                  Skin
                </option>

                <option value="nails">
                  Nails
                </option>

                <option value="other">
                  Other
                </option>
              </select>

              <select
                value={form.level}
                onChange={(e) =>
                  setForm({
                    ...form,
                    level:
                      e.target.value,
                  })
                }
                className="border border-gray-300 rounded-xl px-4 py-3"
              >
                <option value="beginner">
                  Beginner
                </option>

                <option value="intermediate">
                  Intermediate
                </option>

                <option value="advanced">
                  Advanced
                </option>
              </select>

              <input
                value={form.batchSize}
                onChange={(e) =>
                  setForm({
                    ...form,
                    batchSize:
                      e.target.value,
                  })
                }
                type="number"
                placeholder="Batch size"
                className="border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                value={form.syllabus}
                onChange={(e) =>
                  setForm({
                    ...form,
                    syllabus:
                      e.target.value,
                  })
                }
                placeholder="Syllabus (comma separated)"
                className="border border-gray-300 rounded-xl px-4 py-3 md:col-span-2"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive:
                        e.target.checked,
                    })
                  }
                />

                <label>Active</label>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Course Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      imageFile:
                        e.target
                          .files?.[0],
                    })
                  }
                />

                {editing?.image && (
                  <img
                    src={editing.image}
                    alt="course"
                    className="mt-4 w-32 h-32 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
              >
                Save Course
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="border border-gray-300 px-5 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* COURSES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition duration-300"
            >
              {/* IMAGE */}
              <div className="relative h-56 w-full overflow-hidden">

                <img
                  src={
                    course.image ||
                    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
                  }
                  alt={course.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />

                <div className="absolute top-4 right-4">
                  <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full capitalize">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">
                  {renderValue(course.name)}
                </h2>

                <p className="text-gray-600 mt-3 text-sm leading-relaxed line-clamp-3">
                  {renderValue(
                    course.description
                  )}
                </p>

                {/* INFO */}
                <div className="mt-5 space-y-2 text-sm">

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Fees
                    </span>

                    <span className="font-semibold">
                      ₹
                      {renderValue(
                        course.fees
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Duration
                    </span>

                    <span className="font-semibold">
                      {renderValue(
                        course.duration
                          ?.value
                      )}{" "}
                      {renderValue(
                        course.duration
                          ?.type
                      )}
                    </span>
                  </div>

                  {course.instructor && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">
                        Instructor
                      </span>

                      <span className="font-medium">
                        {course
                          .instructor
                          ?.name ||
                          course.instructor}
                      </span>
                    </div>
                  )}
                </div>

                {/* SYLLABUS */}
                {course.syllabus
                  ?.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold mb-2">
                        Course Includes
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {course.syllabus
                          ?.slice(0, 3)
                          .map((item, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                {/* ACTIONS */}
                <div className="mt-6 flex items-center gap-3">

                  <Link
                    to={`/academy/${course._id}`}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-950 text-white text-center py-3 rounded-xl font-medium transition"
                  >
                    View Details
                  </Link>

                  {hasRole([
                    "admin",
                    "superadmin",
                  ]) && (
                      <>
                        <button
                          onClick={() =>
                            startEdit(course)
                          }
                          className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              course._id
                            )
                          }
                          className="px-4 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademyPage;