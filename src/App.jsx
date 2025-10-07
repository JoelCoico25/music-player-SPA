
import styles from "./App.module.css";
import { lazy, Suspense } from "react";

function App() {
  const MusicPlayer = lazy(() => import("../src/components/MusicPlayer/MusicPlayer.jsx"));
  return (
    <>
      <section className={styles.container}>
        <Suspense fallback={<div>Cargando...</div>}>
          <MusicPlayer />
        </Suspense>
      </section>
    </>
  );
}

export default App;
