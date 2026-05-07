const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-gray-500">{title}</h3>

      <h1 className="text-3xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
};

export default Card;