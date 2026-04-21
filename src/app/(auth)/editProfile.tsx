import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
    // UseAuth for updating user
    const {user, updateUser} = useAuth();
    
    // Use states to track changes. Defaults to old name and username if fields are empty
    const [editedName, setEditedName] = useState(user?.name?.trim() || "");
    const [editedUsername, setEditedUsername] = useState(user?.username?.trim() || "");


    const handleEditComplete = async () =>{
        try {
            // Updates user info and onboarding status, ensures clean routing
            await updateUser({
                name: editedName.trim() || user?.name,
                username: editedUsername.trim() || user?.username,
                onboardingCompleted: true,
            });
            Alert.alert("Success", "Successfully Updated Profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "Failed to update profile. Please try again.");
        }

    }

    const handleCancel = async () => {
        // Updates onboarding status and routes back to profile page
        if (user?.onboardingCompleted === false) {
            await updateUser({ onboardingCompleted: true });
        }
        router.back();
    }
    
    return( 
        <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
            <View style={styles.content}>
                <View style ={styles.header}>

                    <Text style={styles.title}>
                        Edit Your Profile
                    </Text>

                    <Text style={styles.subtitle}>
                        Make the changes you want here
                    </Text>

                </View>

                <View style={styles.form}>

                    <TextInput
                        style={styles.input}  
                        placeholder={
                            user?.name?.trim() || "Add Name"
                        }
                        placeholderTextColor={"#999"}
                        value={editedName}
                        onChangeText={setEditedName}
                        autoCapitalize="none" 
                    />

                    <TextInput  
                        style={styles.input}
                        placeholder={
                            user?.username?.trim() || "Add Username"
                        }
                        placeholderTextColor={"#999"}
                        value={editedUsername}
                        onChangeText={setEditedUsername}
                        autoCapitalize="none"
                    />
                </View>


                <TouchableOpacity onPress={handleEditComplete} style={styles.button}>

                    <View>
                        <Text style={styles.buttonText}>Complete Editing</Text>
                    </View>
                    
                </TouchableOpacity >


                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>

                    <View>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </View>

                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    
    container: {
      flex: 1,
  },
  content:{
    flex:1,
    justifyContent:"center",
    padding: 24,

  },
  header: {
    marginBottom: 32
  },
  title:{
    fontSize: 32,
    fontWeight:"bold",
    marginBottom: 8,
  },
  subtitle:{
    fontSize: 16,
    marginBottom: 32,
    color:"#667"
  },
  form:{
    width:"100%",
    alignItems:"center",
  },
  input:{
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    width:"100%",
    borderWidth: 1,
    borderColor: "#e0e0e0" ,     
  },
  button:{
    backgroundColor: "#3C5E95",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width:"100%",
  },
  cancelButton:{
    backgroundColor: "#D3D3D3",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    alignItems: "center",
    width:"100%",
  },
  cancelButtonText:{
    color:"#000",
    fontSize: 16,
    fontWeight: 600,
  },
  buttonText:{
    color:"#eee",
    fontSize: 16,
    fontWeight: 600,
  },
}
);
