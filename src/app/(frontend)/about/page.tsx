export default function AboutPage() {
  return (
    <div className="bg-brand-primary min-h-screen">
      <section className="pt-24 pb-12 bg-brand-secondary border-b border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase mb-4">About Us</h1>
          <p className="text-text-muted max-w-2xl mx-auto">Discover the story behind TRIARCHIA.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert prose-lg mx-auto">
            <h2 className="text-neon-green text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              TRIARCHIA is a premium cyber luxury fashion brand born from the fusion of high-end streetwear and futuristic aesthetics. 
              We believe that clothing is not just fabric, but a statement of identity in an increasingly digital world.
            </p>
            
            <h2 className="text-neon-purple text-3xl font-bold mb-6">The Aesthetic</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Drawing inspiration from dystopian cyberpunk literature, brutalist architecture, and underground tech culture, 
              our garments are designed to stand out in the dark. We use premium, durable materials designed to weather both the physical and digital elements.
            </p>
            
            <div className="bg-brand-secondary p-8 border border-gray-800 rounded-lg mt-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-widest uppercase">Join The Revolution</h3>
              <p className="text-gray-400 mb-6">Experience the future of fashion. Stand out.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
