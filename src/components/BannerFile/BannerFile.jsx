import { useState, useCallback} from "react";
import { MdCloudUpload } from "react-icons/md";
import styles from "@components/BannerFile/BannerFile.module.css";
import { usePlaylistContext } from "@context/usePlaylistContext";

const BannerFile = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { isLoading, importFiles } = usePlaylistContext();


  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        await importFiles(files);
      }
    },
    [importFiles]
  );

  const handleFileInput = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await importFiles(files);
    }
  };

  return (
    <div
      className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      <input
        type="file"
        webkitdirectory=""
        directory=""
        multiple
        accept="audio/*"
        onChange={handleFileInput}
        className={styles.fileInput}
      />

      <div className={styles.dropzoneContent}>
        {isLoading ? (
          <span>Cargando...</span>
        ) : (
          <MdCloudUpload className={styles.uploadIcon} color="gray" />
        )}
      </div>
    </div>
  );

};

export default BannerFile;
