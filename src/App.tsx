import type { ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { pages } from "./pages";

const PAGE_COMPONENTS: Record<string, ComponentType> = {
  home: Home,
};

export function App() {
  return (
    <Layout>
      <Routes>
        {pages.map((page) => {
          const Component = PAGE_COMPONENTS[page.key];
          return (
            <Route
              key={page.key}
              path={page.path === "" ? "/" : `/${page.path}`}
              element={<Component />}
            />
          );
        })}
      </Routes>
    </Layout>
  );
}
