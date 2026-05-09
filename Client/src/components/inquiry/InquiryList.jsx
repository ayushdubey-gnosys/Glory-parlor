import React from "react";
import InquiryCard from "./InquiryCard";
import EmptyState from "./EmptyState";

const InquiryList = ({
  items = [],
  loading,
  onDelete,
  onRespond,
}) => {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading inquiries...
      </div>
    );
  }

  if (!items.length) {
    return (
      <EmptyState
        title="No inquiries found"
        subtitle="Customer inquiries will appear here."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {items.map((item) => (
        <InquiryCard
          key={item._id}
          inquiry={item}
          onDelete={onDelete}
          onRespond={onRespond}
        />
      ))}
    </div>
  );
};

export default InquiryList;