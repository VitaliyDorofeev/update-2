/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
const Select = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  className,
  disabled,
}: any) => {
  return (
    <select
      id={id}
      className={`custom-select ${className}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>

      {!!options?.length && options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
