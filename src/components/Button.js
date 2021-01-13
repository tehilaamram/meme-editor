import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

class ButtonComp extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles[this.props.style]}
                onPress={this.props.onPress}
                activeOpacity={0.3}
            >
                {this.props.type === 'moveup' && <Entypo name="arrow-bold-up" size={24} color="black" />}
                {this.props.type === 'movedown' && <Entypo name="arrow-bold-down" size={24} color="black" />}
                {this.props.type === 'selectline' && <Entypo name="select-arrows" size={24} color="black" />}
                {this.props.type === 'deleteline' && <AntDesign name="delete" size={24} color="black" />}
                {this.props.type === 'addline' && <Octicons name="plus" size={24} color="black" />}
                {this.props.type === 'decfont' && <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="black" />}
                {this.props.type === 'incfont' && <MaterialCommunityIcons name="format-font-size-increase" size={24} color="black" />}
                {this.props.type === 'alcenter' && <FontAwesome name="align-center" size={24} color="black" />}
                {this.props.type === 'alleft' && <FontAwesome name="align-left" size={24} color="black" />}
                {this.props.type === 'alright' && <FontAwesome name="align-right" size={24} color="black" />}
                {this.props.text !== undefined && this.props.text.length > 0 && <Text>{this.props.text}</Text>}
            </TouchableOpacity>
        );
    }
}

export default ButtonComp;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    icon: {
        backgroundColor: "#DDDDDD",
        height: 50,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});