import Hero from "./components/Hero";
import FeatureIcons from "./components/FeatureIcons";
import Rooms from "./components/Rooms";

export default function App() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#f8f0e5]">
      {/* Hero Section */}
      <Hero />
      <Rooms />
      {/* Feature Icons Section */}
      <FeatureIcons />
    </div>
  );
}
