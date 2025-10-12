import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import Button from "@components/shared/Button/Button";
import {memo} from 'react'

const PlayerControls = memo(({ isPlaying, onTogglePlay, onPrev, onNext }) => {

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <Button onClick={onPrev} icon={<MdSkipPrevious size={32} color="gray" />} />
      <Button
        onClick={onTogglePlay}
        icon={
          isPlaying ? (
            <FaPause size={46} color="gray" />
          ) : (
            <FaPlay size={46} color="gray"/>
          )
        }
      />
      <Button onClick={onNext} icon={<MdSkipNext size={32} color="gray" />} />
    </div>
  );
});

export default PlayerControls;