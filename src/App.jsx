import { Suspense, lazy } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useProgress } from './context/ProgressContext'
import { OwlSvg } from './components/ui/Mascot'

const Home = lazy(() => import('./pages/Home'))
const TopicHome = lazy(() => import('./pages/TopicHome'))
const Learn = lazy(() => import('./pages/Learn'))
const Practice = lazy(() => import('./pages/Practice'))
const Test = lazy(() => import('./pages/Test'))
const Awards = lazy(() => import('./pages/Awards'))
const Games = lazy(() => import('./pages/Games'))
const Puzzles = lazy(() => import('./pages/Puzzles'))
const ParentDashboard = lazy(() => import('./pages/ParentDashboard'))
const Settings = lazy(() => import('./pages/Settings'))

export default function App() {
  const { stars } = useProgress()
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <div className="app-bg flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-brand-purple">
            <OwlSvg mood="happy" size={40} />
            <span className="hidden sm:inline">Math Whiz Junior</span>
          </Link>
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Main navigation">
              <Link to="/games" className="rounded-full px-1.5 py-1 text-xs font-bold text-purple-600 hover:bg-purple-100 sm:px-2 sm:text-sm">🎮 <span className="hidden lg:inline">Games</span></Link>
              <Link to="/puzzles" className="rounded-full px-1.5 py-1 text-xs font-bold text-purple-600 hover:bg-purple-100 sm:px-2 sm:text-sm">🧩 <span className="hidden lg:inline">Puzzles</span></Link>
              <Link to="/parents" className="rounded-full px-1.5 py-1 text-xs font-bold text-purple-600 hover:bg-purple-100 sm:px-2 sm:text-sm">👨‍👩‍👧 <span className="hidden lg:inline">Parents</span></Link>
              <Link to="/settings" className="rounded-full px-2 py-1 text-sm font-bold text-purple-600 hover:bg-purple-100" aria-label="Settings">⚙️</Link>
            </nav>
            <Link
              to="/awards"
              className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 font-display text-lg font-bold text-amber-600 transition hover:bg-yellow-200"
              title="Your stars and badges"
            >
              <span className="text-xl">⭐</span>
              <span>{stars}</span>
            </Link>
            {!onHome && (
              <Link
                to="/"
                className="rounded-full bg-purple-100 px-3 py-1.5 font-display font-bold text-brand-purple transition hover:bg-purple-200"
              >
                🏠 <span className="hidden sm:inline">Home</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        <Suspense fallback={<div className="rounded-3xl bg-white/80 p-8 text-center font-display text-xl font-bold text-purple-600">Loading your math adventure…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/games" element={<Games />} />
            <Route path="/puzzles" element={<Puzzles />} />
            <Route path="/parents" element={<ParentDashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/topic/:topicId" element={<TopicHome />} />
            <Route path="/topic/:topicId/learn" element={<Learn />} />
            <Route path="/topic/:topicId/practice" element={<Practice />} />
            <Route path="/topic/:topicId/practice/:subId" element={<Practice />} />
            <Route path="/topic/:topicId/test" element={<Test />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="py-4 text-center text-sm font-semibold text-purple-400">
        Made with 💜 for young mathematicians · Grade 2 → 4
      </footer>
    </div>
  )
}
