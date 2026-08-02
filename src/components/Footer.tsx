export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy-light/40 px-6 py-8 text-xs text-text-tertiary">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2 text-center sm:text-left">
          <p>
            Built by{" "}
            <a
              href="https://github.com/CoderSTanvir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-accent hover:text-gold-accent/80 transition"
            >
              Shahriar Tanvir
            </a>
          </p>
          <p>
            Daffodil International University, SWE —{" "}
            <a
              href="mailto:262-35-351@diu.edu.bd"
              className="text-gold-accent hover:text-gold-accent/80 transition"
            >
              262-35-351@diu.edu.bd
            </a>
          </p>
          <p>Rakib Khan — Class Representative</p>
          <p>Department of Maritime Law and Policy, Bangladesh Maritime University</p>
        </div>
      </div>
    </footer>
  );
}
