import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import TextInput from '../components/TextInput';
import autoBind from 'react-autobind';
import ImageList from '../components/ImageList';
import { withNavigation } from 'react-navigation';

class ImageGalleryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            imageList: [],
            imageFilterList: [],
        };
        autoBind(this);
    }
    async componentDidMount() {
        const { default: image1 } = await import('../../assets/images/flowers.png')
        const { default: image2 } = await import('../../assets/images/flowers123.jpg')
        const { default: image3 } = await import('../../assets/images/dog2.jpg')
        const { default: image4 } = await import('../../assets/images/horse1.jpg')
        const { default: image5 } = await import('../../assets/images/horse2.jpg')
        const { default: image6 } = await import('../../assets/images/horse3.jpg')
        const { default: image7 } = await import('../../assets/images/parrot.jpg')
        const { default: image8 } = await import('../../assets/images/dogr.jpg')
        this.setState({
            imageList: [
                { src: Image.resolveAssetSource(image1).uri, name: 'flowers' },
                { src: Image.resolveAssetSource(image2).uri, name: 'flowers123' },
                { src: Image.resolveAssetSource(image3).uri, name: 'dog2' },
                { src: Image.resolveAssetSource(image4).uri, name: 'horse1' },
                { src: Image.resolveAssetSource(image5).uri, name: 'horse2' },
                { src: Image.resolveAssetSource(image6).uri, name: 'horse3' },
                { src: Image.resolveAssetSource(image7).uri, name: 'parrot' },
                { src: Image.resolveAssetSource(image8).uri, name: 'dogr' },
            ],
        });
    }
    onSearchChange(searchValue) {
        console.log(searchValue, ' search')
        if (searchValue.length >= 3) {
            const imagesWithFilter = this.state.imageList.filter((item) => {
                console.log(item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
                if (item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
                    return item;
            });
            this.setState({ imageFilterList: imagesWithFilter, searchValue });
        } else {
            this.setState({ searchValue });
        }
    }
    handleImageClick(e, item) {
        this.props.navigation.navigate('MemeEditor', {
            img: item,
        });
    }
    render() {
        return (
            <View style={styles.imageGalleryContainer}>
                <ScrollView>
                    <View style={styles.searchContainer}>
                        <TextInput placeholder={"SEARCH"} value={this.state.searchValue} onChangeText={this.onSearchChange} style={'search'} />
                    </View>
                    {this.state.searchValue.length >= 3 ?
                        <ImageList imageList={this.state.imageFilterList} isClick={true} handleImageClick={this.handleImageClick} /> :
                        <ImageList imageList={this.state.imageList} isClick={true} handleImageClick={this.handleImageClick} />}
                </ScrollView>
            </View>
        );
    }
}

export default withNavigation(ImageGalleryScreen);

const styles = StyleSheet.create({
    imageGalleryContainer: {
        flexDirection: 'column',
        display: 'flex',
    },
    searchContainer: {
        alignItems: 'flex-start',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 8,
    },
});