# Vinyl Scanner

A simple React Native app built with Expo to scan barcodes of vinyl records and fetch metadata from the Discogs API. This project is a bare bones MVP designed to demonstrate React Native and Expo capabilities, and to serve as a starting point for future development.

## Features

- **Barcode scanning:** Open the app and scan vinyl record barcodes using the device camera.
- **Discogs API integration:** Automatically fetch record details after scanning.
- **Collection view:** Browse your scanned records stored locally.
- **Tabbed navigation:** Easy access to different app sections via bottom tabs.
- **Profile placeholder:** A simple profile screen for future user management.

## Tech stack

- React Native with Expo
- Expo Camera for barcode scanning
- React Navigation with bottom tabs
- Redux or AsyncStorage for local state management
- Discogs API for record metadata

## Roadmap

- Implement user auth
- Add wishlist / search?

## Setup & Usage

1. Clone the repo.
2. Run `yarn`.
3. Start the Expo project with `yarn start` or tweak to your preferred package manager.
4. Grant camera permission when prompted.
5. Use the Scan tab to scan barcodes and add records to your collection.
