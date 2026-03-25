export default function Footer({ footerText, brandName }) {
  return (
    <footer className="py-8 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-cormorant text-lg text-brown tracking-widest">{brandName}</span>
        <p className="font-jost text-xs text-muted-foreground tracking-wider text-center md:text-right">{footerText}</p>
      </div>
    </footer>
  )
}
