import MoonLoader from "react-spinners/MoonLoader";

const Loading = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <MoonLoader color="#020213" size={100} loading={true} />
    </div>
  );
};

export default Loading;
