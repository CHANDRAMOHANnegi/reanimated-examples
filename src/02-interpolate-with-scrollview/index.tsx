import React from "react";
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { Page } from "./components/page";

const SIZE = 100.0

const WORDS = ["What's", "up", "mobile", "devs"]

export default function InterPolate() {

    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        console.log(event.contentOffset.x);
        translateX.value = event.contentOffset.x
    })

    return (
        <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            horizontal
            style={{ flex: 1, backgroundColor: "#fff" }}>
            {WORDS.map((title, index) => {
                return <Page key={index.toString()}
                    title={title}
                    index={index}
                    translateX={translateX}
                />
            })}
        </Animated.ScrollView>
    );
}

