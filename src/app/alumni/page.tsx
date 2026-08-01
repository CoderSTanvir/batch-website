import StudentCard from "@/components/StudentCard";
import { alumni } from "@/data/students";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

export default function AlumniPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <FadeInUp>
        <h1 className="mb-2 text-3xl lg:text-4xl font-bold text-foreground">Alumni</h1>
        <p className="mb-8 text-text-secondary">Our seniors — where they are now. Tap a card for details.</p>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {alumni.map((a) => (
          <StaggerItem key={a.id}>
            <StudentCard student={a} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
