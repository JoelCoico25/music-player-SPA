import { FaPlay, FaPause } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import Button from "../shared/Button/Button";
import {memo, useCallback} from 'react'

const PlayerControls = memo(({state, setState}) => {
  const handlePlayPause = useCallback(() => {
    setState(prev => !prev)
  }, [setState])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <Button icon={<MdSkipPrevious size={32} color="gray" />} />
      <Button
        onClick={handlePlayPause}
        icon={
          state ? (
            <FaPause size={46} color="gray" />
          ) : (
            <FaPlay size={46} color="gray" />
          )
        }
      />
      <Button icon={<MdSkipNext size={32} color="gray" />} />
    </div>
  );
});

export default PlayerControls;