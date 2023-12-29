interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput = ({ value, onChange }: Props) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Donorszám</span>
      </div>
      <input
        type="number"
        placeholder="pl.: 12345678"
        className="input input-md input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
