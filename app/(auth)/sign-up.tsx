import {
  View,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        //TODO: Create a database user !

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      setVerification({
        ...verification,
        //@ts-ignore
        error: err.errors[0].longmessage,
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create your account
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView className="p-5">
        <InputField
          label="Name"
          placeholder={"Enter your name"}
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        <InputField
          label="Email"
          placeholder={"Enter your email"}
          icon={icons.email}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <InputField
          label="Password"
          secureTextEntry={true}
          placeholder={"Enter your name"}
          icon={icons.lock}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton
          title={"Sign Up"}
          className={"mt-6"}
          onPress={onSignUpPress}
        />

        <OAuth />

        <Link
          href="/sign-in"
          className={"text-lg text-center text-general-200 mt-10"}
        >
          <Text>Already have an account ?</Text>
          <Text className="text-primary-500"> Log In </Text>
        </Link>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              {" "}
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We have sent a verification email to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="Enter your code"
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton title="Verify Email" onPress={onVerifyPress} />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5 "
            />
            <Text className="text-3xl font-JakartaBold font-bold text-center">
              Verified
            </Text>
            <Text className="text-base font-Jakarta text-gray-400 text-center mt-2 mb-5">
              You have successfully signed in !
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;
