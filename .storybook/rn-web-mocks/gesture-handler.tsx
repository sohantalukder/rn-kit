import React from 'react';

type GestureCallback = (event: Record<string, unknown>) => void;

type GestureCallbacks = Record<string, GestureCallback>;

type MockGesture = {
  __callbacks: GestureCallbacks;
  __enabled: boolean;
  __type: string;
  [key: string]:
    | boolean
    | string
    | GestureCallbacks
    | ((...args: unknown[]) => MockGesture);
};

const createGesture = (type: string): MockGesture => {
  const callbacks: GestureCallbacks = {};
  let enabled = true;

  const api = new Proxy(
    {},
    {
      get: (_target, property) => {
        if (property === '__callbacks') {
          return callbacks;
        }

        if (property === '__enabled') {
          return enabled;
        }

        if (property === '__type') {
          return type;
        }

        if (property === 'toString') {
          return () => `[MockGesture:${type}]`;
        }

        if (property === 'enabled') {
          return (value = true) => {
            enabled = Boolean(value);
            return api;
          };
        }

        if (typeof property === 'string' && property.startsWith('on')) {
          return (callback?: GestureCallback) => {
            if (typeof callback === 'function') {
              callbacks[property] = callback;
            }
            return api;
          };
        }

        return () => api;
      },
    }
  ) as MockGesture;

  return api;
};

const createComposedGesture =
  (type: string) =>
  (...gestures: MockGesture[]) => {
    const gesture = createGesture(type);
    gesture.__callbacks = gestures.reduce<GestureCallbacks>(
      (callbacks, current) => ({
        ...callbacks,
        ...(current?.__callbacks ?? {}),
      }),
      {}
    );
    return gesture;
  };

const createGestureEvent = (event: React.SyntheticEvent) => {
  const nativeEvent = event.nativeEvent as {
    changedTouches?: Array<{ x?: number; y?: number; pageX?: number; pageY?: number }>;
    clientX?: number;
    clientY?: number;
    offsetX?: number;
    offsetY?: number;
  };
  const x = nativeEvent.offsetX ?? nativeEvent.clientX ?? nativeEvent.changedTouches?.[0]?.x ?? 0;
  const y = nativeEvent.offsetY ?? nativeEvent.clientY ?? nativeEvent.changedTouches?.[0]?.y ?? 0;

  return {
    changedTouches: [{ x, y }],
    translationX: 0,
    translationY: 0,
    velocityX: 0,
    velocityY: 0,
    x,
    y,
  };
};

export const Gesture = {
  Composed: createComposedGesture('Composed'),
  Exclusive: createComposedGesture('Exclusive'),
  Fling: () => createGesture('Fling'),
  LongPress: () => createGesture('LongPress'),
  Pan: () => createGesture('Pan'),
  Pinch: () => createGesture('Pinch'),
  Race: createComposedGesture('Race'),
  Rotation: () => createGesture('Rotation'),
  Simultaneous: createComposedGesture('Simultaneous'),
  Tap: () => createGesture('Tap'),
};

export function GestureDetector({
  children,
  gesture,
}: React.PropsWithChildren<{ gesture?: unknown }>) {
  const mockGesture = gesture as Partial<MockGesture> | undefined;
  const callbacks = mockGesture?.__callbacks ?? {};
  const enabled = mockGesture?.__enabled !== false;
  const lastEndAt = React.useRef(0);

  const call = React.useCallback(
    (name: string, event: React.SyntheticEvent) => {
      if (!enabled) return;
      callbacks[name]?.(createGestureEvent(event));
    },
    [callbacks, enabled]
  );

  const callStart = React.useCallback(
    (event: React.SyntheticEvent) => {
      call('onBegin', event);
      call('onStart', event);
      call('onTouchesDown', event);
    },
    [call]
  );

  const callMove = React.useCallback(
    (event: React.SyntheticEvent) => {
      call('onChange', event);
      call('onUpdate', event);
    },
    [call]
  );

  const callEnd = React.useCallback(
    (event: React.SyntheticEvent) => {
      const now = Date.now();
      if (now - lastEndAt.current < 80) return;

      call('onTouchesUp', event);
      call('onEnd', event);
      call('onFinalize', event);
      lastEndAt.current = now;
    },
    [call]
  );

  const callCancel = React.useCallback(
    (event: React.SyntheticEvent) => {
      call('onTouchesCancelled', event);
      call('onFinalize', event);
    },
    [call]
  );

  const handlers = {
    onClick: (event: React.SyntheticEvent) => {
      callStart(event);
      callEnd(event);
    },
    onPointerCancel: callCancel,
    onPointerDown: callStart,
    onPointerMove: callMove,
    onPointerUp: callEnd,
    onResponderGrant: callStart,
    onResponderMove: callMove,
    onResponderRelease: callEnd,
    onResponderTerminate: callCancel,
    onStartShouldSetResponder: () => enabled,
    onTouchCancel: callCancel,
    onTouchEnd: callEnd,
    onTouchMove: callMove,
    onTouchStart: callStart,
  };

  if (!React.isValidElement(children)) {
    return <>{children}</>;
  }

  return React.cloneElement(children, handlers);
}

export function GestureHandlerRootView({
  children,
}: React.PropsWithChildren<{ style?: unknown }>) {
  return <>{children}</>;
}

export const GestureHandlerRootViewContext = React.createContext(false);

export const gestureHandlerRootHOC =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => <Component {...props} />;

export const Directions = {
  DOWN: 2,
  LEFT: 4,
  RIGHT: 1,
  UP: 8,
};

export const State = {
  ACTIVE: 'ACTIVE',
  BEGAN: 'BEGAN',
  CANCELLED: 'CANCELLED',
  END: 'END',
  FAILED: 'FAILED',
  UNDETERMINED: 'UNDETERMINED',
};
