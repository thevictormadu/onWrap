import {
  MdFlashOn,
  MdStar,
  MdLightbulb,
  MdCode,
  MdMergeType,
  MdEdit,
  MdLocalFireDepartment,
  MdEmojiEvents,
} from "react-icons/md";
import { COLORS } from "./colors";

// Icon components for EndNoteCard with transparent round backgrounds
export const StreakIcon = () => <MdFlashOn color={COLORS.blue} />;
export const StarsReceivedIcon = () => <MdStar color={COLORS.blue} />;
export const TopLanguageIcon = () => <MdLightbulb color={COLORS.blue} />;
export const CommitsIcon = () => <MdCode color={COLORS.blue} />;
export const PullRequestsIcon = () => <MdMergeType color={COLORS.blue} />;
export const PrReviewsIcon = () => <MdEdit color={COLORS.blue} />;
export const PeakPerformanceIcon = () => (
  <MdLocalFireDepartment color={COLORS.blue} />
);
export const SlangIcon = () => <MdEmojiEvents color={COLORS.blue} />;

