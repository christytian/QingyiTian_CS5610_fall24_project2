import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import all components
import Game from './MineSweeperGame.jsx';
import Rules from './Rules.jsx';
import Home from './Home.jsx';
import { MineSweeperGameProvider } from './MineSweeperGameProvider.jsx';
import './MineSweeperGame.css';

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/rules',
    element: <Rules />
  },
  {
    path: '/game/:difficulty',
    element: (
      <MineSweeperGameProvider>
        <Game />
      </MineSweeperGameProvider>
    )
  }
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);