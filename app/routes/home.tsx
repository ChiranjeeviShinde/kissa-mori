import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <img
            src="/logo.png"
            className="w-36 cursor-pointer sm:w-44"
            alt="Kissa Mori"
          />

          <Link
            to="/"
            className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:border-espresso/40 hover:text-text-primary"
          >
            Our Menu
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl items-center px-4 py-16 sm:px-6 md:py-24">
          <div className="grid w-full items-center gap-12 md:grid-cols-2">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                Welcome to KissaMori
              </span>

              <h1 className="mt-4 max-w-xl font-serif text-5xl font-medium leading-tight text-text-primary sm:text-6xl">
                Good coffee,
                <br />
                made simple.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary">
                Freshly brewed coffee, carefully crafted and served just the way
                you like it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="rounded-full bg-espresso px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-accent-hover"
                >
                  Explore Menu
                </Link>

                <a
                  href="#about"
                  className="rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-medium text-text-secondary transition hover:border-espresso/40 hover:text-text-primary"
                >
                  About Us
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
                <img
                  src="/coffee-hero.jpeg"
                  alt="Freshly brewed coffee"
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-background px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-text-muted">
                  Freshly brewed
                </p>

                <p className="mt-1 font-serif text-lg text-text-primary">
                  Every cup, every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                About KissaMori
              </span>

              <h2 className="mt-3 font-serif text-3xl font-medium text-text-primary sm:text-4xl">
                A little place for good coffee.
              </h2>

              <p className="mt-5 leading-7 text-text-secondary">
                From rich espresso to smooth lattes and refreshing cold brews,
                our menu is made for coffee lovers. Pick your drink, add it to
                your cart and enjoy a simple ordering experience.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-serif text-xl">Fresh</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Carefully prepared coffee using quality ingredients.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-serif text-xl">Simple</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Browse the menu and order directly from your table.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-serif text-xl">Made for you</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Your coffee, your way, without unnecessary complications.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Kissa Mori</span>

          <span>Good coffee. Good moments.</span>
        </div>
      </footer>
    </div>
  );
}
