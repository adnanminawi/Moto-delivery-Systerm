import { adminStyles } from "./admin-styles";

type FormFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
};

export default function FormField({
  id,
  label,
  placeholder,
  type,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor={id}>
        {label}
      </label>
      <input
        className={adminStyles.input}
        id={id}
        name={id}
        placeholder={placeholder}
        required
        type={type}
      />
    </div>
  );
}
