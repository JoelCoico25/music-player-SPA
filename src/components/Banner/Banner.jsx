import styles from "@components/Banner/Banner.module.css";
import Button from "@components/shared/Button/Button";
import { FaHeart } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";

const Banner = ({ state = "none", song, artist, album, coverUrl }) => {
  return (
    <section className={styles.banner}>
      <div className={styles.imageContainer}>
        <img
          src={coverUrl || "/public/music-player-logo.png"}
          alt={`${album} cover art`}
          title="Album cover art"
          width={350}
          style={{ borderRadius: "45px" }}
          loading="lazy"
        />
      </div>
      <div className={styles.textContainer}>
        <h2 style={{ color: "var(--state-text)", fontSize: "20px" }}>
          {state === "none" ? "None Song" : state === "paused" ? "Paused" : "Now Playing"}
        </h2>
        <div className={styles.songInfo}>
          <h3 style={{ fontSize: "30px" }}>{song}</h3>
          <h3 style={{ opacity: 0.35, fontSize: "24px" }}>{artist}</h3>
          <h3 style={{ fontSize: "22px" }}>{album}</h3>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button icon={<FaHeart size={46} color="gray" />} variant={"primary"} />
        <Button icon={<MdOutlinePlaylistAdd size={46} color="gray" />} variant={"primary"} />
        <Button icon={<FaShareAlt size={46} color="gray" />} variant={"primary"} />
      </div>
    </section>
  );
};

export default Banner;
