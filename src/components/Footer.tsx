export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy-light/40 px-6 py-8 text-xs text-text-tertiary">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="space-y-1">
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
          <p>Daffodil International University — Software Engineering Department</p>
          <p>
            <a
              href="mailto:262-35-351@diu.edu.bd"
              className="text-gold-accent hover:text-gold-accent/80 transition"
            >
              262-35-351@diu.edu.bd
            </a>
          </p>
        </div>
        <span className="mt-2 sm:mt-0">&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
