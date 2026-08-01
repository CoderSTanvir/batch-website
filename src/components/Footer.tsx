export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 px-6 py-4 text-xs text-gray-400">
      <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p>
            Built by{" "}
            <a
              href="https://github.com/CoderSTanvir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:underline"
            >
              Shahriar Tanvir
            </a>
          </p>
          <p>Daffodil International University, SWE</p>
          <p>
            <a
              href="mailto:262-35-351@diu.edu.bd"
              className="hover:underline"
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
