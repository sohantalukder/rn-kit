import type { BaseScreenProps } from '../../templates';
import ScreenContainer from '../../templates/screen-container/ScreenContainer';

const SafeScreen = (props: BaseScreenProps) => (
  <ScreenContainer
    {...props}
    useErrorBoundary={true}
  />
);

export default SafeScreen;
