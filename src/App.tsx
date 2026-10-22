/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import Story from './components/Story';
import Lookbook from './components/Lookbook';
import FeaturedShirt from './components/FeaturedShirt';
import Craftsmanship from './components/Craftsmanship';
import FabricScience from './components/FabricScience';
import Manifesto from './components/Manifesto';
import Materials from './components/Materials';
import Philosophy from './components/Philosophy';
import Silhouette from './components/Silhouette';
import TheProcess from './components/TheProcess';
import DepthScene from './components/DepthScene';
import HorizontalGallery from './components/HorizontalGallery';
import ScrubText from './components/ScrubText';
import Locations from './components/Locations';
import Footer from './components/Footer';
import Noise from './components/Noise';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <SmoothScroll>
      <Noise />
      <CustomCursor />
      <main className="bg-ink text-paper selection:bg-paper selection:text-ink">
        <Hero />
        <Story />
        <Lookbook />
        <FeaturedShirt />
        <Manifesto />
        <Craftsmanship />
        <FabricScience />
        <Materials />
        <Philosophy />
        <TheProcess />
        <Silhouette />
        <DepthScene />
        <HorizontalGallery />
        <ScrubText />
        <Locations />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
