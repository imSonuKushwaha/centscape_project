# 🪙 Centscape — Wishlist App

Centscape is a React Native (Expo) app that helps users track their savings goals and manage a wishlist of items.
Users can monitor progress, add items by pasting product URLs, and view saved items in a persistent list.

---

## 🚀 Setup & Run Instructions

### Prerequisites

- Node.js **18+**
- npm or yarn
- Expo CLI

### Installation

# Install dependencies

npm install

# Run the development server

npx expo start

# You can then open the app in:

Expo Go (scan QR code)
iOS simulator
Android emulator
Development build

# Features

Dashboard: Track savings progress with goal and motivational text.
Wishlist: Persistent wishlist stored via AsyncStorage.
Add Items: Paste a product URL → fetch preview → save item.
Preloaded Demo Items: AirPods Max + Zara Top.
Shared UI: Wishlist component reused across Dashboard and Wishlist.
Navigation: Implemented with Expo Router.
UI: Polished, consistent with design spec.

# 🤖 AI Usage Disclosure

AI assistance (ChatGPT) was used in the following ways:
Code Generation: Initial scaffolding of useWishlist (Zustand + AsyncStorage).
UI Consistency: Extracted a shared WishlistItem component for reuse.
Bug Fixing: Helped debug missing preloaded items and price.toFixed issue.
Documentation: Drafted this README.
