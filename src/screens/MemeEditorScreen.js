import React from 'react';
import { View, StyleSheet, Text, Platform, AsyncStorage, ImageBackground, ScrollView } from 'react-native';
import TextInput from '../components/TextInput';
import autoBind from 'react-autobind';
import ViewShot from "react-native-view-shot";
import Button from '../components/Button';
import { withNavigation } from 'react-navigation';

class MemeEditorScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textLines: ['', ''],
            textLineToEdit: 0,
            textLinesAlign: ['center', 'center'],
            textLinesSize: [40, 40],
        }
        autoBind(this);
    }
    saveMemeToLocalStorage() {
        this.refs.viewShot.capture().then(uri => {
            if (Platform.OS === 'android') {
                AsyncStorage.getItem('img', (error, result) => {
                    if (error) {
                        return;
                    }
                    if (result === null) {
                        AsyncStorage.setItem('img', JSON.stringify([uri]));
                        this.props.navigation.navigate('Gallery');
                    } else {
                        AsyncStorage.setItem('img', JSON.stringify(JSON.parse(result).concat(uri)));
                        this.props.navigation.navigate('Gallery');
                    }
                });
            }
        });
    };
    onTextLineChange(str) {
        let lineTextPrev = this.state.textLines;
        lineTextPrev[this.state.textLineToEdit] = str;
        this.setState({
            textLines: lineTextPrev,
        });
    }
    onSelectLineChange(e) {
        this.setState({
            textLineToEdit: (this.state.textLineToEdit + 1) % 2,
        });
    }
    onAlignTextChange(e) {
        let lineTextPrev = this.state.textLinesAlign;
        lineTextPrev[this.state.textLineToEdit] = e;
        this.setState({
            textLinesAlign: lineTextPrev,
        });
    }
    onSizeTextChange(e) {
        let lineTextPrev = this.state.textLinesSize;
        if (e === 'inc') {
            lineTextPrev[this.state.textLineToEdit] = lineTextPrev[this.state.textLineToEdit] + 2;
        } else {
            lineTextPrev[this.state.textLineToEdit] = Math.max(0, lineTextPrev[this.state.textLineToEdit] - 2);
        }
        this.setState({
            textLinesSize: lineTextPrev,
        });
    }
    render() {
        return (
            <View style={styles.memeEditorScreenContainer}>
                <ScrollView  >
                    <ViewShot ref="viewShot" style={styles.areaToMeme}>
                        <ImageBackground style={styles.memeImage} source={{ uri: this.props.route.params.img.src }} resizeMode={'stretch'}>
                            <View style={styles.imageEditorContainer}>
                                <Text style={[styles.topLineText, { textAlign: this.state.textLinesAlign[0], fontSize: this.state.textLinesSize[0] }]}>{this.state.textLines[0]}</Text>
                                <Text style={[styles.bottomLineText, { textAlign: this.state.textLinesAlign[1], fontSize: this.state.textLinesSize[1] }]}>{this.state.textLines[1]}</Text>
                            </View>
                        </ImageBackground>

                    </ViewShot>
                    <View style={styles.memeOptionsContainer}>
                        <TextInput placeholder={''} value={this.state.textLines[this.state.textLineToEdit]} onChangeText={this.onTextLineChange} style={'regular'} />
                        <View style={styles.basicControlContainer}>
                            <Button type={'moveup'} style={'icon'} />
                            <Button type={'movedown'} style={'icon'} />
                            <Button type={'selectline'} style={'icon'} onPress={this.onSelectLineChange} />
                            <Button type={'addline'} style={'icon'} />
                            <Button type={'deleteline'} style={'icon'} />
                        </View>
                        <View style={styles.textControlsContainer}>
                            <View style={styles.fontControlsContainer}>
                                <Button type={'incfont'} style={'icon'} onPress={this.onSizeTextChange.bind(this, 'inc')} />
                                <Button type={'decfont'} style={'icon'} onPress={this.onSizeTextChange.bind(this, 'dec')} />
                                <Button type={'alleft'} style={'icon'} onPress={this.onAlignTextChange.bind(this, 'left')} />
                                <Button type={'alcenter'} style={'icon'} onPress={this.onAlignTextChange.bind(this, 'center')} />
                                <Button type={'alright'} style={'icon'} onPress={this.onAlignTextChange.bind(this, 'right')} />
                            </View>
                        </View>
                        <View style={styles.saveMemeContainer}>
                            <Button type={'button'} text={'Download'} style={'button'} onPress={this.saveMemeToLocalStorage} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default withNavigation(MemeEditorScreen);

const styles = StyleSheet.create({
    memeEditorScreenContainer: {
        flexDirection: 'column',
        display: 'flex',

    },
    memeImage: {
        height: '100%',
        width: '100%',
    },
    areaToMeme: {
        width: '90%',
        aspectRatio: 3 / 4,
        alignSelf: 'center',
        marginTop: 10,
    },
    imageEditorContainer: {
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        display: 'flex',
    },
    memeOptionsContainer: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 10,
    },
    topLineText: {
        width: '100%',
        minHeight: 30,
    },
    bottomLineText: {
        width: '100%',
        minHeight: 30,
    },
    basicControlContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    textControlsContainer: {
        marginTop: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
    },
    fontControlsContainer: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveMemeContainer: {
        marginVertical: 10,
    },
});