import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Directory from './Directory';
import Badge from './Badge';
import NotFound from './NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Directory />} />
        <Route path="/id/:slug" element={<Badge />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}