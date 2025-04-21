# 👗 My Digital Wardrobe

Welcome to **My Digital Wardrobe** — a mobile app built with [Expo](https://expo.dev) and React Native that helps users upload, categorize, and mix-and-match clothing items to create and save stylish outfits.

This app was created as part of an independent study project exploring fashion-tech, UX/UI design, and Firebase integration.

---

##  Features

- **Image Uploading**: Add images of your clothing items from your device.
- **Categorization**: Manually sort items into "Tops" and "Bottoms" for easy outfit creation.
- **Outfit Builder**: Swipe through your wardrobe to create outfit combinations.
- **Outfit Saving**: Save favorite combinations like a digital outfit camera roll.
- **Firebase Backend**: Secure image storage and user-specific data handling using Firebase Authentication, Firestore, and Firebase Storage.
- **Modern UI**: Clean, swipe-friendly interface designed with accessibility and visual clarity in mind.

---

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
2. **Start the development server**
    ```bash
   npx expo start

3. **Open the app using one of the following options:**
- **Expo Go (scan the QR code)

- **iOS Simulator

- **Android Emulator

- **Development Build (for full native feature support)
  
## Project Structure
    ```bash
my-digital-wardrobe/
├── app/
│   ├── screens/         # Core UI screens (Upload, Mix & Match, Outfit View)
│   ├── components/      # Reusable UI components
│   ├── firebase/        # Firebase configuration and helpers
│   ├── assets/          # Image and static assets
│   └── app.js           # Main app entry point
├── package.json
└── README.md

##  Firebase Setup
To use Firebase services, configure your Firebase project and update firebase.js with your credentials.

 **This app uses:**

- **Firebase Authentication** (email/password login)
- **Firestore Database** (for storing outfit metadata and user info)
- **Firebase Storage** (for image uploads)

Make sure Firestore rules are set up to secure user-specific data access.

## User Testing
 **User testing was conducted using:**

- A sample wardrobe of 3 tops and 3 bottoms
- Images sourced from Pinterest
- On-device testing with Expo Go

 ##  Future Enhancements
- Add support for more categories (e.g., coats, jackets, accessories)
- Integrate machine learning for automatic categorization
- Launch a web version of the app
- Add personalization features like outfit suggestions and user preferences

## Learn More
- Expo Documentation : [https://github.com/expo/expo](https://docs.expo.dev/)

- React Native Docs : https://reactnative.dev/

- Firebase Documentation : https://firebase.google.com/?gad_source=1&gbraid=0AAAAADpUDOgNBRgpG8gD33BqPw-cdckHg&gclid=Cj0KCQjwzYLABhD4ARIsALySuCQvJztPZ_VeVV_IabZcXxgTQyzDCD-3_wwKtdQhjCYN_xJw0stqqRUaAjYWEALw_wcB&gclsrc=aw.ds

## Community & Contributions
Have ideas or feedback? Want to collaborate?

- Expo on GitHub : https://github.com/expo/expo

- Firebase GitHub: https://github.com/firebase/

- Join the Expo Discord : https://discord.com/invite/expo

Feel free to fork this repo, submit issues, or create pull requests!





