export default function Footer() {
  return (
    <footer className="flex items-center justify-center gap-4 py-4 px-6 border-t border-border text-xs text-muted-foreground bg-card flex-shrink-0">
      <span>Built by <span className="font-medium text-foreground">
        <a
          href="https://shivakrishnak13.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Shivakrishna Kosari
        </a></span>
      </span>
      <span>·</span>
      <a
        href="https://github.com/shivakrishnak13"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors"
      >
        GitHub
      </a>
      <span>·</span>
      <a
        href="https://linkedin.com/in/shivakrishna-kosari"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors"
      >
        LinkedIn
      </a>
    </footer>
  );
}