import StudentCard from "@/components/StudentCard";
import { students } from "@/data/students";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

export default function StudentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <FadeInUp>
        <h1 className="mb-2 text-3xl lg:text-4xl font-bold text-foreground">All Students</h1>
        <p className="mb-8 text-text-secondary">Tap a card to see full details. Session: 2025–2026</p>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {students.map((s) => (
          <StaggerItem key={s.id}>
            <StudentCard student={s} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
