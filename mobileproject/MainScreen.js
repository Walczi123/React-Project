import React from "react";
import { StyleSheet, 
    View, 
    Text, 
    SafeAreaView, 
    StatusBar, 
    TouchableOpacity 
} from "react-native";

export default class LoginScreen extends React.Component{

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("Search", {service : "Flatly"})}}>
                        <Text style={styles.buttonText}>Flatly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("Search", {service : "Carly"})}}>
                        <Text style={styles.buttonText}>Carly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigate("Search", {service : "Parkly"})}}>
                        <Text style={styles.buttonText}>Parkly</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      //alignItems: 'center',
    },
    button: {
        height: 100,
        width: 150,
        margin: 20,
        alignItems: 'center',
        backgroundColor:'#BCBCBC',
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 80,
        marginBottom: -20
    },
    buttonText: {
        height: 100,
        lineHeight: 100,
        fontSize: 28
    }
})