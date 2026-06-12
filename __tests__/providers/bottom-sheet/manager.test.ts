import { bottomSheet } from '../../../src/providers/bottom-sheet/manager';

describe('bottomSheet manager', () => {
  beforeEach(() => {
    bottomSheet.destroy();
    bottomSheet.mount();
    jest
      .spyOn(global, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    bottomSheet.destroy();
  });

  it('can remount after destroy and open with a new ref', async () => {
    const snapToIndex = jest.fn();
    const close = jest.fn();

    bottomSheet.setRef({
      current: {
        close,
        snapToIndex,
      },
    });

    await bottomSheet.show({
      component: () => null,
    });

    expect(snapToIndex).toHaveBeenCalledWith(1);
    expect(bottomSheet.isOpen()).toBe(true);
  });

  it('resets state on destroy without leaving manager permanently unusable', async () => {
    bottomSheet.destroy();
    bottomSheet.mount();

    expect(bottomSheet.isOpen()).toBe(false);
    await expect(
      bottomSheet.show({ component: () => null })
    ).rejects.toMatchObject({ code: 'REF_NOT_AVAILABLE' });
  });
});
