import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import { COLORS } from '../constants/theme';

interface SliderControlProps {
  label: string;
  value: number;      // -100 to 100
  min?: number;
  max?: number;
  onValueChange: (value: number) => void;
  icon?: string;
}

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 22;

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min = -100,
  max = 100,
  onValueChange,
  icon,
}) => {
  const [trackWidth, setTrackWidth] = React.useState(1);
  const thumbPositionX = React.useRef(new Animated.Value(0)).current;
  const trackRef = React.useRef<View>(null);
  const lastValue = React.useRef(value);

  // Normalize value → position
  const valueToX = useCallback(
    (v: number) => ((v - min) / (max - min)) * trackWidth,
    [min, max, trackWidth]
  );

  // Update thumb position when value changes externally
  React.useEffect(() => {
    if (trackWidth > 1) {
      thumbPositionX.setValue(valueToX(value));
    }
  }, [value, trackWidth, valueToX]);

  const handleTrackLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setTrackWidth(w);
    thumbPositionX.setValue(valueToX(value));
  };

  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (
      e: GestureResponderEvent,
      _gs: PanResponderGestureState
    ) => {
      // Tap position
      const tapX = e.nativeEvent.locationX;
      const clampedX = clamp(tapX, 0, trackWidth);
      thumbPositionX.setValue(clampedX);
      const newVal = Math.round(
        min + (clampedX / trackWidth) * (max - min)
      );
      lastValue.current = newVal;
      onValueChange(newVal);
    },

    onPanResponderMove: (
      _e: GestureResponderEvent,
      gs: PanResponderGestureState
    ) => {
      const currentX = valueToX(lastValue.current);
      const newX = clamp(currentX + gs.dx, 0, trackWidth);
      thumbPositionX.setValue(newX);
      const newVal = Math.round(min + (newX / trackWidth) * (max - min));
      if (newVal !== lastValue.current) {
        lastValue.current = newVal;
        onValueChange(newVal);
      }
    },

    onPanResponderRelease: () => {},
  });

  const fillWidth = thumbPositionX.interpolate({
    inputRange: [0, trackWidth],
    outputRange: [0, trackWidth],
    extrapolate: 'clamp',
  });

  const displayValue = value > 0 ? `+${value}` : `${value}`;
  const isZero = value === 0;

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.header}>
        <View style={styles.labelRow}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={[styles.valueText, !isZero && styles.valueTextActive]}>
          {displayValue}
        </Text>
      </View>

      {/* Track */}
      <View
        ref={trackRef}
        style={styles.trackContainer}
        onLayout={handleTrackLayout}
        {...panResponder.panHandlers}
      >
        {/* Background track */}
        <View style={styles.track}>
          {/* Center marker */}
          <View style={styles.centerMark} />
          {/* Fill */}
          <Animated.View
            style={[
              styles.fill,
              {
                width: fillWidth,
                backgroundColor: isZero ? COLORS.border : COLORS.accent,
              },
            ]}
          />
        </View>

        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbPositionX }],
            },
          ]}
        >
          <View
            style={[
              styles.thumbInner,
              !isZero && { backgroundColor: COLORS.accent },
            ]}
          />
        </Animated.View>
      </View>

      {/* Min / max labels */}
      <View style={styles.rangeRow}>
        <Text style={styles.rangeText}>{min}</Text>
        <Text style={styles.rangeText}>{max}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  valueText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  valueTextActive: {
    color: COLORS.accent,
  },
  trackContainer: {
    height: THUMB_SIZE,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: TRACK_HEIGHT,
    backgroundColor: COLORS.border,
    borderRadius: TRACK_HEIGHT / 2,
    overflow: 'hidden',
    position: 'relative',
  },
  centerMark: {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: 2,
    height: TRACK_HEIGHT,
    backgroundColor: COLORS.textMuted,
    opacity: 0.4,
    zIndex: 1,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    left: -(THUMB_SIZE / 2),
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4,
  },
  thumbInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.textMuted,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeText: {
    color: COLORS.textMuted,
    fontSize: 10,
    opacity: 0.6,
  },
});

export default SliderControl;
