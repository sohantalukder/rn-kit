import {
  getDialogManager,
  setDialogManager,
} from '../../../src/providers/dialog/dialogManager';

describe('DialogManager', () => {
  afterEach(() => {
    setDialogManager(null);
  });

  it('queues dialogs until a setter is registered', () => {
    const manager = getDialogManager();
    const setter = jest.fn();

    manager.show({ title: 'Queued' });
    setDialogManager(setter);

    expect(setter).toHaveBeenCalledWith({ title: 'Queued' });
  });

  it('hides the current dialog through the registered setter', () => {
    const setter = jest.fn();
    setDialogManager(setter);

    const manager = getDialogManager();
    manager.show({ title: 'Visible' });
    manager.hide();

    expect(setter).toHaveBeenLastCalledWith(null);
  });
});
