import React from 'react';
import { View, AsyncStorage } from 'react-native';
import autoBind from 'react-autobind';
import ImageList from '../components/ImageList';
import _ from 'lodash';

class MemesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memesList: [],
        };
        autoBind(this);
        console.log(this.props, ' image gallery screen')
    }
    async componentDidMount() {
        let currMeme  = await AsyncStorage.getItem('img');
        this.setState({memesList: JSON.parse(currMeme)});
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        AsyncStorage.getItem('img', (error, result) => {
            // if (error) {
            //     return;
            // }
            if (result === null) {
                return;
            } else {
                let currMeme = JSON.parse(result);
                if (_.difference(currMeme, prevState.memesList) !== []){
                    this.setState({memesList: currMeme});
                }
            }
        }).catch((err)=> {

        });
    }
    render() {
        return (
            <View>
                <ImageList imageList={this.state.memesList} isClick={false} />
            </View>
        );
    }
}

export default MemesScreen;
