import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";

const SIZE = 100.0

export default function Intro() {

  // value that can be handled from ui thread
  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  const [size, setSize] = React.useState(0);
  const [isOpen, setOpen] = React.useState(false)

  const bodyHeight = useSharedValue(0)

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

  const handleToggle = () => {
    bodyHeight.value = withTiming(bodyHeight.value == 0 ? size : 0, { duration: 500 })
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }}>
        <Animated.View style={[{ height: SIZE, width: SIZE, backgroundColor: "red" }, reanimatedStyle]} />

        <View style={{
          // marginTop: 15,
          // borderWidth: 1,
          // borderColor: 'red',
          // borderRadius: 10,
          // zIndex: 1,
          // backgroundColor: "white"
        }}>

          <TouchableOpacity onPress={handleToggle}>
            <Text>Toggle</Text>
          </TouchableOpacity>

          <Animated.View style={{ height: bodyHeight, backgroundColor: 'yellow', overflow: "hidden" }}>
            <View onLayout={({ nativeEvent: { layout: { height } } }) => setSize(height)}
              style={{ position: "absolute" }}>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
              <Text>Hello</Text>
            </View>
          </Animated.View>
        </View>
      </View>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
