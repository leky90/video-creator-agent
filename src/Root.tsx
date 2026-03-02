import React from "react";
import { Composition, Still } from "remotion";
import { AIKhaNangHienNay } from "./projects/AIKhaNangHienNay/AIKhaNangHienNay";
import { Thumbnail } from "./projects/AIKhaNangHienNay/Thumbnail";
import { TOTAL_FRAMES } from "./projects/AIKhaNangHienNay/timeline.generated";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIKhaNangHienNay"
        component={AIKhaNangHienNay}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={TOTAL_FRAMES}
        defaultProps={{}}
      />
      <Still
        id="AIKhaNangHienNayThumbnail"
        component={Thumbnail}
        width={1280}
        height={720}
        defaultProps={{}}
      />
    </>
  );
};
