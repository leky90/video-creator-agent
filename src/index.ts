// Entry file for Remotion. Example render:
// npx remotion render src/index.ts OpenClawExplainer out/video.mp4

import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
