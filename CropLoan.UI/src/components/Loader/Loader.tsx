import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loader.module.css";

interface LoaderProps {
  canShow: boolean;
}

const Loader = ({ canShow }: LoaderProps) => {
  if (!canShow) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderWrapper}></div>
      <div className={styles.loaderBody}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
