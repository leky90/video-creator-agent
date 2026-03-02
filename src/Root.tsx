import { Composition, Still } from "remotion";
import { OpenClawExplainer } from "./OpenClawExplainer/OpenClawExplainer";
import { TOTAL_FRAMES as EXPLAINER_TOTAL_FRAMES } from "./OpenClawExplainer/constants";
import { AIProductivityTools } from "./AIProductivityTools/AIProductivityTools";
import {
  TOTAL_FRAMES as AIPT_TOTAL_FRAMES,
  FPS as AIPT_FPS,
  WIDTH as AIPT_WIDTH,
  HEIGHT as AIPT_HEIGHT,
} from "./AIProductivityTools/constants";
import { AIPTExplainer } from "./AIPTExplainer/AIPTExplainer";
import { TOTAL_FRAMES as AIPT_EXPLAINER_TOTAL_FRAMES } from "./AIPTExplainer/constants";
import { PromptExplainer } from "./PromptExplainer/PromptExplainer";
import { TOTAL_FRAMES as PROMPT_EXPLAINER_TOTAL_FRAMES } from "./PromptExplainer/constants";
import { AIProductivity } from "./AIProductivity/AIProductivity";
import { TOTAL_FRAMES as AI_PRODUCTIVITY_TOTAL_FRAMES } from "./AIProductivity/constants";
import { AIAgentExplainer } from "./AIAgentExplainer/AIAgentExplainer";
import { TOTAL_FRAMES as AI_AGENT_EXPLAINER_TOTAL_FRAMES } from "./AIAgentExplainer/constants";
import { AIAgentExplainerThumbnail } from "./AIAgentExplainer/Thumbnail";
import { AIBattle2026 } from "./AIBattle2026/AIBattle2026";
import { TOTAL_FRAMES as AI_BATTLE_2026_TOTAL_FRAMES } from "./AIBattle2026/constants";
import { AIBattle2026Thumbnail } from "./AIBattle2026/Thumbnail";
import { AIAutomationBusiness } from "./AIAutomationBusiness/AIAutomationBusiness";
import { TOTAL_FRAMES as AI_AUTOMATION_BUSINESS_TOTAL_FRAMES } from "./AIAutomationBusiness/constants";
import { AIAutomationBusinessThumbnail } from "./AIAutomationBusiness/Thumbnail";
import { IranMilitarySituation } from "./IranMilitarySituation/IranMilitarySituation";
import { TOTAL_FRAMES as IRAN_MILITARY_TOTAL_FRAMES } from "./IranMilitarySituation/constants";
import { IranMilitarySituationThumbnail } from "./IranMilitarySituation/Thumbnail";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IranMilitarySituation"
        component={IranMilitarySituation}
        durationInFrames={IRAN_MILITARY_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="IranMilitarySituationThumbnail"
        component={IranMilitarySituationThumbnail}
        width={1280}
        height={720}
      />
      <Composition
        id="AIAutomationBusiness"
        component={AIAutomationBusiness}
        durationInFrames={AI_AUTOMATION_BUSINESS_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="AIAutomationBusinessThumbnail"
        component={AIAutomationBusinessThumbnail}
        width={1280}
        height={720}
      />
      <Composition
        id="AIBattle2026"
        component={AIBattle2026}
        durationInFrames={AI_BATTLE_2026_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="AIBattle2026Thumbnail"
        component={AIBattle2026Thumbnail}
        width={1280}
        height={720}
      />
      <Composition
        id="AIAgentExplainer"
        component={AIAgentExplainer}
        durationInFrames={AI_AGENT_EXPLAINER_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="AIAgentExplainerThumbnail"
        component={AIAgentExplainerThumbnail}
        width={1280}
        height={720}
      />
      <Composition
        id="AIProductivity"
        component={AIProductivity}
        durationInFrames={AI_PRODUCTIVITY_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIPTExplainer"
        component={AIPTExplainer}
        durationInFrames={AIPT_EXPLAINER_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIProductivityTools"
        component={AIProductivityTools}
        durationInFrames={AIPT_TOTAL_FRAMES}
        fps={AIPT_FPS}
        width={AIPT_WIDTH}
        height={AIPT_HEIGHT}
      />

      <Composition
        id="OpenClawExplainer"
        component={OpenClawExplainer}
        durationInFrames={EXPLAINER_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="PromptExplainer"
        component={PromptExplainer}
        durationInFrames={PROMPT_EXPLAINER_TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
