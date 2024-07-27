import { ThreeDots } from "react-loader-spinner";

type props = {
  width?: string;
  height?: string;
};

const Loading = ({ width = "90", height = "55" }: props) => {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius={9}
      color='blue'
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={true}
    />
  );
};

export default Loading;