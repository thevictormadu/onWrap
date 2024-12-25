import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GitHubProvider} from "./context/GithubContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GitHubProvider>
            <App/>
        </GitHubProvider>
    </StrictMode>,
)
