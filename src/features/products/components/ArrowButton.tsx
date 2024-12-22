import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ChevronLeftIcon
      onClick={onClick}
      sx={{
        color: "black",
        position: "absolute",
        left: { xs: 0, sm: 10 },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        bgcolor: "#ffffff99",
        boxShadow: 2,
        borderRadius: "6px",
        py: 4,
        "&:hover": { bgcolor: "#ffffff90" },
      }}
    />
  );
};

export const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ChevronRightIcon
      onClick={onClick}
      sx={{
        color: "black",
        position: "absolute",
        right: { xs: 0, sm: 10 },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
        bgcolor: "#ffffff99",
        boxShadow: 2,
        borderRadius: "6px",
        py: 4,
        "&:hover": { bgcolor: "#ffffff90" },
      }}
    />
  );
};
