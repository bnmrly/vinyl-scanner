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
- Nativewind for styling  
- Material UI?  
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
3. Start the Expo project with `yarn start` or your preferred package manager.  
4. Grant camera permission when prompted.  
5. Use the Scan tab to scan barcodes and add records to your collection.  

### Environment Variable Setup

1. Create a `.env` file in the project root (same level as `package.json`).  
2. Add your Discogs access token as an environment variable: `EXPO_PUBLIC_DISCOGS_ACCESS_TOKEN=your_discogs_access_token_here`

## Android Screen Share Setup (scrcpy + Google Meet)

Use this setup to mirror your Android phone on your Mac.

### One-Time Mac Setup

- Install required tools:
  - `brew install scrcpy android-platform-tools`
- Confirm install:
  - `scrcpy --version`
  - `adb version`

### One-Time Android Setup

- Enable Developer Options:
  - `Settings -> About phone -> tap Build number 7 times`
- Open:
  - `Settings -> Developer options`
- Turn on:
  - `USB debugging`
  - Optional: `Stay awake while charging`

### First USB Connection (with new data cable)

- Connect phone directly to Mac (avoid dock/hub for setup).
- On phone, open USB options and set:
  - `USB controlled by`: `This device`
  - `Use USB for`: `Transferring files` (or `File transfer` / `MTP`)
- On Mac, run:
  - `adb devices`
- If you see `unauthorized`:
  - On phone, accept `Allow USB debugging`
  - Tick `Always allow from this computer`
  - Run `adb devices` again
- Continue when device shows as `device` (not `unauthorized`).

### Verify Mirroring Works

- Run:
  - `scrcpy`
- Confirm phone screen appears on Mac.

### Enable Wireless scrcpy (recommended for meetings)

- Find phone IP:
  - `adb shell ip route`
  - Look for `src <PHONE_IP>`
- Switch ADB to TCP:
  - `adb tcpip 5555`
- Connect over Wi-Fi:
  - `adb connect <PHONE_IP>:5555`
- Unplug cable.
- Start mirroring wirelessly:
  - `scrcpy --tcpip=<PHONE_IP> --stay-awake`

### Present in Google Meet

- In Meet on Mac:
  - `Present now -> A window`
  - Select the `scrcpy` window
- Demo from phone as usual.

### Pre-Meeting 2-Minute Routine

- Ensure phone + Mac are on same Wi-Fi.
- Run:
  - `adb connect <PHONE_IP>:5555`
  - `scrcpy --tcpip=<PHONE_IP> --stay-awake`
- Start Meet and share the `scrcpy` window.

### Quick Fix If It Stops Working

- Restart ADB:
  - `adb kill-server && adb start-server && adb devices`
- Reconnect Wi-Fi ADB:
  - `adb connect <PHONE_IP>:5555`
- If still failing:
  - Reconnect USB cable
  - Re-run `adb tcpip 5555`
  - Retry `adb connect <PHONE_IP>:5555`
