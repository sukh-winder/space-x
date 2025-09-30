# Welcome to Space-X Expo app 👋

# SpaceX Launch Explorer

A polished React Native mobile app built with Expo SDK 54 and TypeScript that provides a maps-first experience for exploring SpaceX launches and launchpads.

## 🚀 Features

### Core Functionality

- **Launch List**: Infinite scrolling list of SpaceX launches with search functionality
- **Launch Details**: Comprehensive information about each mission including launchpad data
- **Maps Integration**: Interactive map showing launchpad locations with native Maps app integration
- **Location Services**: User location detection and distance calculation to launchpads
- **Pull-to-Refresh**: Real-time data updates from SpaceX API

### Maps-First Experience

- View launchpad locations on an interactive map interface
- Get directions to launchpads using native Maps apps (Apple Maps/Google Maps)
- Calculate and display distance from user's current location to launchpads
- One-tap navigation to external Maps applications

### User Experience

- Clean, modern UI with light theme
- Smooth animations and transitions
- Loading states and error handling
- Empty states with helpful messaging
- Responsive design for various screen sizes

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 54 (Managed Workflow)
- **Language**: TypeScript
- **Navigation**: React Navigation 7 (Stack Navigator)
- **Location Services**: expo-location
- **API**: SpaceX REST API v4/v5
- **Code Quality**: ESLint + Prettier
- **Architecture**: Custom hooks, service layer, and component-based structure

## 📱 App Structure

```
├── .gitignore
├── .prettierrc.json
├── .vscode
    ├── extensions.json
    └── settings.json
├── README.md
├── app.json
├── app
    ├── (space-x)
    │   ├── [id]
    │   │   └── launchPad.tsx
    │   ├── _layout.tsx
    │   └── space-x.tsx
    └── _layout.tsx
├── assets
    └── images
    │   ├── android-icon-background.png
    │   ├── android-icon-foreground.png
    │   ├── android-icon-monochrome.png
    │   ├── favicon.png
    │   ├── icon.png
    │   ├── partial-react-logo.png
    │   ├── react-logo.png
    │   ├── react-logo@2x.png
    │   ├── react-logo@3x.png
    │   └── splash-icon.png
├── components
    ├── Capsule.tsx
    ├── Card
    │   ├── Card.tsx
    │   └── CardFooter.tsx
    ├── ErrorBoundary.tsx
    ├── LaunchPad
    │   └── LaunchPadMap.tsx
    ├── SpaceX
    │   ├── SpaceXLaunchPad.tsx
    │   ├── SpaceXList.tsx
    │   └── utils
    │   │   └── apiServices.ts
    └── ui
    │   ├── Img.tsx
    │   ├── SearchBar.tsx
    │   ├── icon-symbol.ios.tsx
    │   └── icon-symbol.tsx
├── constants
    ├── constants.ts
    └── theme.ts
├── eslint.config.js
├── helper
    ├── apiClient.ts
    ├── common.ts
    └── types
    │   ├── commonTypes.d.ts
    │   ├── launchPad.d.ts
    │   ├── launches.d.ts
    │   └── launchesPagination.d.ts
├── hooks
    ├── use-color-scheme.ts
    ├── use-theme-color.ts
    └── useLocation.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

## 📌 Maps Implementation

### Libraries Used

- **expo-location**: For requesting location permissions and getting user's current location
- **React Native Linking**: For opening native Maps applications
- **Custom Maps Integration**: Fallback map interface that opens native Maps apps

### Permission Flows

1. **Location Permission Request**: App requests foreground location permission when user wants to see distance to launchpad
2. **Permission Handling**: Graceful handling of denied permissions with clear user messaging
3. **Fallback Behavior**: App remains functional even without location permissions

### Maps Integration Features

- **Native Maps Integration**: Opens Apple Maps on iOS, Google Maps on Android
- **Directions**: Direct navigation to launchpad locations
- **Distance Calculation**: Haversine formula for accurate distance calculation
- **Error Handling**: Comprehensive error handling for Maps app availability

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd space-x
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

### Development Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web (limited functionality)
npm run web

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📊 API Integration

### SpaceX API Endpoints

- **Launches**: `https://api.spacexdata.com/v5/launches` - Paginated launch data
- **Launchpads**: `https://api.spacexdata.com/v4/launchpads/:id` - Detailed launchpad information

### Data Flow

1. **Launch List**: Fetches launches with pagination and enriches with launchpad data
2. **Search**: Client-side filtering by mission name
3. **Error Handling**: Robust error handling with retry mechanisms

## 🧪 Testing

### Manual Testing Checklist

- [✓] Launch list loads and displays correctly
- [✓] Search functionality works across different criteria
- [✓] Pull-to-refresh updates data
- [✓] Infinite scroll loads more launches
- [✓] Launch details screen shows complete information
- [✓] Map tab displays launchpad location
- [✓] Location permission flow works correctly
- [✓] Distance calculation is accurate
- [✓] Native Maps integration opens correct apps
- [✓] Error states display appropriately
- [✓] Loading states provide good UX

### Device Testing

- Test on Android devices
- Verify responsive design on different screen sizes
- Test location services on physical devices
- Verify Maps integration works with installed Maps apps

## 🚀 Deployment

### Expo Build

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

## 🔧 Configuration

### Environment Variables

No environment variables required - the app uses public SpaceX API endpoints.

### App Configuration (app.json)

```json
{
  "expo": {
    "name": "Space-X",
    "slug": "space-x-app",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "permissions": ["LOCATION"]
  }
}
```

---
![WhatsApp Image 2025-10-01 at 2 03 53 AM (1)](https://github.com/user-attachments/assets/412bdbe4-b757-48cf-8cd1-50b51b9e90f6)
![WhatsApp Image 2025-10-01 at 2 03 52 AM](https://github.com/user-attachments/assets/514f9944-0fbc-4073-a5ab-e64e755a902e)
![WhatsApp Image 2025-10-01 at 2 03 53 AM](https://github.com/user-attachments/assets/3a213097-2009-40e3-b174-9d5237f8bb84)



## for complete folder structure and app info click the icon below

[![sukh-winder/space-x context](https://badge.forgithub.com/sukh-winder/space-x)](https://uithub.com/sukh-winder/space-x)
