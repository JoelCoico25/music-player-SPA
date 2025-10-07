import { useState, useCallback, useEffect } from "react";
import { MdCloudUpload } from "react-icons/md";
import styles from "./BannerFile.module.css";
import { usePlaylist } from "../../hooks/usePlaylist";

const BannerFile = () => {
  const [isDragging, setIsDragging] = useState(false);
  const {isLoading} = usePlaylist();


  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("audio/")
      );

      if (files.length > 0) {
        console.log(isLoading)
      }
    },
    []
  );

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("audio/")
    );
    if (files.length > 0) {
      processFiles(files);
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
  );s

};

export default BannerFile;
