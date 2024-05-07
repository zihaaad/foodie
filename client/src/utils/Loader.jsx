import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "5rem auto",
  borderColor: "red",
};

export default function Loader({size}) {
  return (
    <MoonLoader
      size={size}
      color="#ff6347"
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
