# onWrap - GitHub Year in Review

A beautiful, interactive web application that generates a personalized "Year in Review" wrap for your GitHub activity, similar to Spotify Wrapped but for developers.

## Features

- 📊 **Comprehensive GitHub Stats**: View your total stars, commits, pull requests, reviews, and more
- 🎨 **Beautiful UI**: Modern glassmorphism design with smooth animations
- 🎵 **Background Music**: Optional background music for an immersive experience
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⌨️ **Keyboard Navigation**: Navigate slides with arrow keys or spacebar
- 📥 **Export as Image**: Download your wrap as a shareable image
- ♿ **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation, focus indicators)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **GitHub GraphQL API** for fetching user data

## Prerequisites

- Node.js 18+ and npm
- A GitHub Personal Access Token with appropriate permissions

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/thevictormadu/onWrap.git
cd onWrap
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up GitHub Token

You need a GitHub Personal Access Token to use the GraphQL API:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "onWrap")
4. Select the following scopes:
   - `public_repo` (to read public repository data)
   - `read:user` (to read user profile information)
5. Click "Generate token"
6. Copy the token (you won't be able to see it again!)

### 4. Create Environment File

Copy the example environment file and add your token:

```bash
cp .env.example .env
```

Then edit `.env` and replace `your_github_token_here` with your actual GitHub token.

**Security Warning**: Never commit your `.env` file to version control. It's already in `.gitignore`. If you accidentally commit a token, revoke it immediately at: https://github.com/settings/tokens

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Usage

1. Enter your GitHub username on the home page
2. Click "Generate My Wrap"
3. Wait for your data to load
4. Navigate through your personalized slides:
   - Click left/right sides of the screen to navigate
   - Use arrow keys or spacebar for keyboard navigation
   - Use the refresh button to restart from the beginning
5. Download your wrap as an image from the final slide

## Project Structure

```
src/
├── components/          # React components
│   ├── Home.tsx        # Landing page with username input
│   ├── Wrap.tsx        # Main wrap slideshow component
│   ├── Slider.tsx      # Slide navigation component
│   └── ...
├── context/            # React context providers
│   └── GithubContext.tsx  # GitHub data fetching and state
├── constants/          # Constants and configuration
│   ├── constants.ts    # Text content and labels
│   └── ui.ts          # UI constants (durations, breakpoints, colors)
├── utils.ts           # Utility functions
└── App.tsx            # Main app component with routing
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GITHUB_TOKEN` | GitHub Personal Access Token | Yes |

## GitHub API Rate Limits

The GitHub API has rate limits:
- **Authenticated requests**: 5,000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

Using a personal access token significantly increases your rate limit. If you hit the rate limit, you'll see an error message and need to wait before trying again.

## Keyboard Shortcuts

- **Arrow Right** or **Space**: Next slide
- **Arrow Left**: Previous slide

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Built with ❤️ by [Victor Madu](https://github.com/thevictormadu)

## Acknowledgments

- Inspired by Spotify Wrapped
- Uses GitHub GraphQL API
- Design inspired by modern glassmorphism trends
