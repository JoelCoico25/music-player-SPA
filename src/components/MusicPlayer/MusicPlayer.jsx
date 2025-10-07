import Banner from "../Banner/Banner";
import Controls from "../Controls/Controls";
import ProgressBar from "../ProgressBar/ProgressBar";
import BannerFile from "../BannerFile/BannerFile";

const MusicPlayer = () => {
  const handleFolderSelect = (files) => {
    console.log("Archivos de audio seleccionados:", files);
    // Procesa los archivos aquí
  };

  return (
    <>
      <Banner
        song={"Purple haze"}
        artist={"Jimi Hendrix"}
        album={"WoodStock"}
      />
      <ProgressBar />
      <Controls />
      <BannerFile onFolderSelect={handleFolderSelect} />
    </>
  );
};

export default MusicPlayer;
