import CancelIcon from './Cancel.icon';
import CheckIcon from './Check.icon';
import { commonIconRegistry } from './CommonIcons.icon';
import DeleteIcon from './Delete.icon';
import DownArrowIcon from './DownArrow.icon';
import EmptyContentIcon from './EmptyContent.icon';
import ErrorIcon from './Error.icon';
import EyeOffIcon from './EyeOff.icon';
import EyeOnIcon from './EyeOn.icon';
import LanguageIcon from './Language.icon';
import LeftArrowIcon from './LeftArrow.icon';
import LoaderIcon from './Loader.icon';
import LockIcon from './Lock.icon';
import LogoutIcon from './Logout.icon';
import MoreIcon from './More.icon';
import NoInternetIcon from './NoInternet.icon';
import NotificationIcon from './Notification.icon';
import PlaceholderIcon from './Placeholder.icon';
import ProfileIcon from './Profile.icon';
import RefreshIcon from './Refresh.icon';
import ResetIcon from './Reset.icon';
import SearchIcon from './Search.icon';
import SendIcon from './Send.icon';
import ShareIcon from './Share.icon';
import SuccessIcon from './Success.icon';
import ThemeIcon from './Theme.icon';
export { iconNames } from './names';
export type { IconName } from './names';

export const iconRegistry = {
  ...commonIconRegistry,
  cancel: CancelIcon,
  check: CheckIcon,
  delete: DeleteIcon,
  downArrow: DownArrowIcon,
  emptyContent: EmptyContentIcon,
  error: ErrorIcon,
  eyeOff: EyeOffIcon,
  eyeOn: EyeOnIcon,
  language: LanguageIcon,
  leftArrow: LeftArrowIcon,
  loader: LoaderIcon,
  lock: LockIcon,
  logout: LogoutIcon,
  more: MoreIcon,
  noInternet: NoInternetIcon,
  notification: NotificationIcon,
  placeholder: PlaceholderIcon,
  profile: ProfileIcon,
  refresh: RefreshIcon,
  reset: ResetIcon,
  search: SearchIcon,
  send: SendIcon,
  share: ShareIcon,
  success: SuccessIcon,
  theme: ThemeIcon,
} as const;
