import React, {useCallback, useRef} from "react";
import {Animated, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {styles} from "./styles";

export default function RoundButton({name, size, color, onPress}) {

    const scale = useRef(new Animated.Value(1)).current;

    const animateScale = useCallback(
        (newValue) => {
            Animated.spring(scale, {
                toValue: newValue,
                friction: 4,
                useNativeDriver: true,
            }).start();
            console.log("button pressed")
        },
        [scale]
    );

    return (
        <TouchableWithoutFeedback
            onPressIn={() => animateScale(0.8)}
            delayPressIn={0}
            onPressOut={() => {
                animateScale(1);
                onPress();
            }}
            delayPressOut={110}>
            <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
                <Icon name={name} size={size} color={color} />
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}