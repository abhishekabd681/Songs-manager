# 🎵 Songs Manager App

A **ReactJS Songs Management WebApp** built with **Material UI**.  
Users can sign up, log in, browse songs from the iTunes API, and manage their own song collection.

---

## Features

### 🔐 Authentication

- Sign Up & Login system with **validation**.
- Credentials stored securely in **localStorage** (acts as a mock backend).
- Popup alerts on successful login or signup.

### 🎶 Dashboard

- Fetches songs from **iTunes Search API** and this is the link of above api (https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/SearchExamples.html#//apple_ref/doc/uid/TP40017632-CH6-SW1)
- Play songs directly from search results.
- Global mini audio player.
- Search bar for **song name, artist name, etc.**

### My Song Page (User Song Management)

- Each logged-in user gets their **own song page**.
- **Add Song**: Add a new song manually.
- **Edit Song**: Update song details.
- **Delete Song**: Remove individual songs or delete the whole page.
- **Play Songs**: Listen directly from your collection.
- **Search & Filters**:
  - Search by **song name** or **singer**.
  - Filter by **Alphabet** or **Year range**.

### Additional Features

- Fully **responsive** design (mobile, tablet, desktop).
- Uses **React.memo**, **useCallback**, and **useMemo** for performance optimizations.
