import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { AiChat } from "@/components/ai-chat"

export default function Page() {
  return (
    <main className="page-bg relative">
      <ScrollProgress />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <FooterSection />
      <AiChat />
    </main>
  )
}
