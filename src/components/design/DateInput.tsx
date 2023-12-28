interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput = ({ value, onChange }: Props) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Születési dátum</span>
      </div>
      <input
        className="input input-md input-bordered w-full"
        type="date"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
