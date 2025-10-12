import styles from "@/App.module.css";
import { lazy, Suspense } from "react";
import { PlaylistProvider } from "@context/PlaylistContext.jsx";

function App() {
  const MusicPlayer = lazy(() => import("@components/MusicPlayer/MusicPlayer.jsx"));
  return (
    <>
      <section className={styles.container}>
        <PlaylistProvider>
          <Suspense fallback={<div>Cargando...</div>}>
            <MusicPlayer />
          </Suspense>
        </PlaylistProvider>
      </section>
    </>
  );
}

export default App;
