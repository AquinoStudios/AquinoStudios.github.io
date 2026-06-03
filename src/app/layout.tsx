import type { Metadata } from 'next'
import { Navbar } from '@/components/shared/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { SocialProof } from '@/components/sections/SocialProof'
import { Pricing } from '@/components/sections/Pricing'
import { FAQSection } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { BRAND } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: `${BRAND.name} - ${BRAND.tagline}`,
  description: BRAND.description,
  keywords: ['membresía', 'comunidad', 'profesionales', 'mentoría', 'networking'],
  openGraph: {
    title: BRAND.name,
    description: BRAND.description,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>
          <Hero />
          <Benefits />
          <HowItWorks />
          <SocialProof />
          <Pricing />
          <FAQSection />
          <Footer />
        </main>
        {children}
      </body>
    </html>
  )
}
