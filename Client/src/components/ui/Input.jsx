const Input = ({
  label,
  type = "text",
  placeholder,
  register,
  name,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="border p-3 rounded-lg outline-none"
      />
    </div>
  );
};

export default Input;