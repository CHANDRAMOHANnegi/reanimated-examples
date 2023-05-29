import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";

const SIZE = 100.0

export default function Intro() {

  // value that can be handled from ui thread
  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  const handleRotation = (progress: Animated.SharedValue<number>): any => {
    'worklet'
    return `${progress.value * 2 * Math.PI}rad`
  }

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        { scale: scale.value, },
        { rotate: handleRotation(progress) }
      ]
    }
  })

  React.useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 3, true)
    scale.value = withRepeat(withSpring(1), 3, true)
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
      <Text>Hello</Text>
      <Animated.View style={[{ height: SIZE, width: SIZE, backgroundColor: "red" }, reanimatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({});
