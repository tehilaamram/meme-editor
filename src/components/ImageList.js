import React from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import autoBind from 'react-autobind';

class ImageList extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    renderItem({ item }) {
        return (
        <Image source={{uri: item}}
                style={styles.image}
            />
        );
    }

    renderClickItem({ item }) {
        return (
            <TouchableOpacity onPress={()=> this.props.handleImageClick(this, item)}>
                <Image
                source={{
                    uri: item.src
                }}
                    style={styles.image}
                />
             </TouchableOpacity>
        );
    }

    render() {
        return (
            <FlatList
                numColumns={2}
                data={this.props.imageList}
                renderItem={this.props.isClick ? this.renderClickItem : this.renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.ImageContainer}
            />
        );
    }
}

export default ImageList;

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 150,
        resizeMode: 'contain',
        borderColor: 'gray',
        borderWidth: 0.5,
        margin: 4,
    },
    ImageContainer: {
        // paddingVertical: 4,
        alignItems: 'center',
    },
});