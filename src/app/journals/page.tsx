import JournalCard from "@/components/JournalCard";
import { journals } from "@/data/content";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

export default function JournalsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      <FadeInUp>
        <h1 className="mb-2 text-3xl lg:text-4xl font-bold text-foreground">Journals</h1>
        <p className="mb-8 text-text-secondary">Write-ups and reflections shared by batchmates. Tap an entry to read more.</p>
      </FadeInUp>

      <StaggerContainer className="space-y-4">
        {journals.map((j) => (
          <StaggerItem key={j.id}>
            <JournalCard entry={j} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
