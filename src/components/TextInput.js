import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

class TextInputComp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TextInput
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                ref={this.props.ref}
                value={this.props.value}
                style={styles[this.props.style]}
            />
        );
    }
}

export default TextInputComp;

const styles = StyleSheet.create({
    search: {
        borderRadius: 2,
        borderColor: '#e5e8ea',
        textAlign: 'left',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: 100,
      },
      regular: {
        borderRadius: 2,
        borderColor: 'black',
        textAlign: 'left',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: '100%',
      },
});