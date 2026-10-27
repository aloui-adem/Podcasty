# Podcasty

Podcasty is a full-stack web application that lets users create, join, and manage collaborative rooms to listen to podcasts together using the Spotify Web API. Room hosts retain playback authority (play, pause, skip), while guests can sync their playback state in real time.

## Features

- **Room Management:** Create private or public rooms with custom passcodes, guest playback control permissions, and vote-to-skip thresholds.
- **Spotify OAuth Integration:** Authenticate with Spotify accounts to access user playback controls and podcast feeds.
- **Synchronized Playback:** Synchronize podcast episodes, play/pause states, and track progress across all connected room participants.
- **REST API & WebSockets:** Django REST Framework API endpoints paired with React state management for live state polling/updates.

## Tech Stack

- **Backend:** Python, Django, Django REST Framework
- **Frontend:** JavaScript (ES6+), React.js, Webpack, Babel
- **Integration:** Spotify Web API (OAuth 2.0 PKCE / Authorization Code Flow)

---

## Prerequisites

- Python 3.10+
- Node.js 19+ and `npm`
- A [Spotify Developer Account](https://developer.spotify.com/dashboard)
