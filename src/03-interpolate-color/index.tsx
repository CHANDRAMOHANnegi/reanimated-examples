import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const Colors = {
    dark: {
        background: '#1E1E1E',
        circle: '#252525',
        text: '#F8F8F8',
    },
    light: {
        background: '#F8F8F8',
        circle: '#FFF',
        text: '#1E1E1E',
    },
};

const SWITCH_TRACK_COLOR = {
    true: 'rgba(256, 0, 256, 0.2)',
    false: 'rgba(0,0,0,0.1)',
};

type Theme = 'light' | 'dark';

export default function InterPolateColor() {
    const [theme, settheme] = useState<Theme>('light');
    const progress = useDerivedValue(() => {
        return theme === 'light' ? withTiming(1) : withTiming(0)
    }, [theme])

    const rStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.background, Colors.dark.background]
        )
        return {
            backgroundColor
        };
    });

    const rCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.circle, Colors.dark.circle]
        )
        return {
            backgroundColor
        };
    });

    const rTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.light.text, Colors.dark.text]
        )
        return {
            color
        };
    });

    return <Animated.View style={[styles.container, rStyle]}>
        <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
        <Animated.View style={[styles.circle, rCircleStyle]}>
            <Switch value={theme === "dark"}
                onValueChange={(toggled) => { settheme(toggled ? "dark" : "light") }}
                trackColor={SWITCH_TRACK_COLOR}
                thumbColor={"violet"}
            />
        </Animated.View>
    </Animated.View>
}

const SIZE = Dimensions.get("window").width * 0.7

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    circle: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZE / 2,
        shadowOffset: {
            width: 20,
            height: 20
        },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 8
    },
    text: {
        fontSize: 70,
        textTransform: 'uppercase',
        fontWeight: "700",
        letterSpacing: 14,
        marginBottom: 35
    }
});
