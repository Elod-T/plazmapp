interface Props {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

export const Button = ({ className, children, onClick, loading }: Props) => {
  return (
    <button
      className={
        "btn btn-wide rounded-[0.875rem] font-semibold text-white mx-auto  " +
          className || ""
      }
      onClick={onClick}
    >
      {children}
      {loading && <span className="loading loading-spinner loading-sm"></span>}
    </button>
  );
};
