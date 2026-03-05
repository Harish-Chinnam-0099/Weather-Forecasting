export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          Weather Forecast App
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  )
}