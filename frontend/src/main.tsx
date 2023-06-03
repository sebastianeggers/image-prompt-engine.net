import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MidjourneyPromptGenerator } from './pages/midjourney/MidjourneyPromptGenerator.tsx'
import { Home } from './pages/Home.tsx'
import { GettingStartedWithMidjourney } from './pages/guides/GettingStartedWithMidjourney.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'midjourney/prompt-generator',
        element: <MidjourneyPromptGenerator />
      },
      {
        path: 'guides/getting-started-with-midjourney',
        element: <GettingStartedWithMidjourney />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
