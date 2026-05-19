interface Props {
  message: string;
}

const ErrorAlert = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-bounce">
      <div className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px]">
        <span className="text-xl">⚠️</span>

        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;
