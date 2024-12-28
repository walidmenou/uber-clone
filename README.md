# React Native Uber Clone 🚗

A modern mobile application built with React Native and Expo, featuring a sleek user interface and smooth user experience similar to Uber.

## Features ✨

- **User Authentication** with Clerk
- **Custom Onboarding Flow**
- **OAuth Integration** (Google Sign-in)
- **Real-time Location Services**
- **Interactive Map Interface**
- **Ride History**
- **Profile Management**
- **Chat System**
- **Responsive Design**

## Tech Stack 🛠️

- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - Development platform
- [Clerk](https://clerk.dev/) - Authentication
- [NativeWind](https://www.nativewind.dev/) - Styling
- [Expo Router](https://docs.expo.dev/routing/introduction/) - Navigation
- React Native Maps - Map integration
- TypeScript - Type safety

## Getting Started 🚀

1. Clone the repository
```bash
git clone https://github.com/yourusername/uber-clone.git
```

2. Install dependencies
```bash
cd uber-clone
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory and add:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

4. Start the development server
```bash
npm start
```

## Project Structure 📁

```
uber-clone/
├── app/                   # Application screens
│   ├── (auth)/           # Authentication screens
│   └── (root)/           # Main app screens
├── assets/               # Images, fonts, and icons
├── components/           # Reusable components
├── constants/            # App constants
└── types/                # TypeScript types
```