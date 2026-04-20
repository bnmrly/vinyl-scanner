# Vinyl Scanner

React Native app (Expo + Expo Router) for scanning vinyl barcodes, fetching Discogs metadata, and managing a local collection.

## Current MVP Features

- Scan vinyl barcodes with camera.
- Fetch Discogs results by barcode and enrich with release details.
- Save records to Redux collection.
- Prevent duplicate records.
- Delete records from collection (simple and detailed views).
- Toggle collection layout:
  - simple two-column grid
  - detailed single-column cards
- Persist collection to local storage (`AsyncStorage`) across app restarts.
- Scanner UX states:
  - loading
  - API error
  - no-result
- Camera permission UX:
  - grant permission CTA
  - open settings CTA when permission is blocked

## Tech Stack

- Expo + React Native
- Expo Router (tab navigation)
- Expo Camera
- Redux Toolkit + React Redux
- AsyncStorage (`@react-native-async-storage/async-storage`)
- NativeWind
- TypeScript

## Setup

1. Clone the repo.
2. Install dependencies:
   - `yarn`
3. Configure environment variables (see section below).
4. Start the app:
   - `yarn start`
5. Open in Expo Go and grant camera permission.

## Environment Variable Setup

1. Create a `.env` file in the project root (same level as `package.json`).
2. Add your Discogs access token:
   - `EXPO_PUBLIC_DISCOGS_ACCESS_TOKEN=your_discogs_access_token_here`

## Scripts

- `yarn start`
- `yarn android`
- `yarn ios`
- `yarn web`

## Roadmap

- Implement user auth.
- Enhance the profile screen.

## Notes

- Collection data is local-only and stored on-device.
- Current scan flow uses the first Discogs barcode search result.

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
