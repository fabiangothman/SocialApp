# SocialApp
Social app build on React Native

## Comments
This app was built using expo
- expo init SocialApp

## To have in mind
- Use yarn as the default package manager:
    - yarn install
    - yarn start

## Install dependencies/packages
- If it's the first time you run the app, use:
    - yarn install
- If not, you can update the packages by using:
    - yarn update

## Using Firebase
- yarn add @react-native-firebase/app

## Run app
To run your project, navigate to the directory and run one of the following yarn commands.
- cd react-native-course
- yarn start (This will open browser where you may decide to open iOS, Android or web)
- If you want to run directly a platform then:
    - yarn android
    - yarn ios # requires an iOS device or macOS for access to an iOS simulator
    - yarn web

## Deploy
- expo build:android
- expo build:ios (Needs to be done from a MAC computer)
- expo build:web (Generates a web-build folder)
    - You can run a local server via: npx serve web-build
    - Or upload it to a cloud server via: https://docs.expo.io/distribution/publishing-websites/