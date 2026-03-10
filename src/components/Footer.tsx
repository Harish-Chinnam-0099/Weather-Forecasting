export default function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="font-medium text-foreground">
          Weather Forecast App
        </p>
        <p className="mt-1 text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  )
}