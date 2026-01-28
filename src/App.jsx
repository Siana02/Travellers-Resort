import Hero from "./components/Hero";
import FeatureIcons from "./components/FeatureIcons";

export default function App() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero />
      {/* Feature Icons Section */}
      <FeatureIcons />
    </div>
  );
}
