import { setToastManager, toast } from '../../../src/providers/toast/toastManager';

describe('ToastManager', () => {
  afterEach(() => {
    setToastManager(null);
  });

  it('queues toasts until a setter is registered', () => {
    const setter = jest.fn();

    toast.show({ type: 'success', title: 'Ready' });
    setToastManager(setter);

    expect(setter).toHaveBeenCalledWith([
      expect.objectContaining({ title: 'Ready', type: 'success' }),
    ]);
  });

  it('returns a hide callback for shown toasts', () => {
    const setter = jest.fn();
    setToastManager(setter);

    const hide = toast.show({ type: 'success', title: 'Saved' });
    hide();

    expect(setter).toHaveBeenLastCalledWith([]);
  });
});
