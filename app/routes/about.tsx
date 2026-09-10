import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Logo from "../../components/Logo";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
          <div className="flex flex-row items-center justify-between">
            <Logo />
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer rounded-full border border-border bg-surface p-2.5 text-text-primary transition hover:border-espresso/40 active:scale-95"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <Sidebar open={open} setOpen={setOpen} />

      <main className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold text-text-primary">
              About Us
            </h1>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Kissa Mori began with a simple idea: that a good cup of coffee
              does not need to be complicated. Our story is a fictional tale
              inspired by the warmth, patience, and resourcefulness that have
              always surrounded small coffee houses.
            </p>

            <div className="mt-10 space-y-8 text-text-secondary">
              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  The Beginning
                </h2>

                <p className="mt-4 text-lg leading-8">
                  Long before Kissa Mori had a name, there was a man who lived
                  in a tiny room at the edge of a quiet town. He had very little
                  money, very few possessions, and almost nothing that could be
                  called a kitchen. What he did have was an old metal cup, a
                  handful of coffee beans, and an unreasonable belief that
                  coffee could make even the hardest morning feel a little
                  easier.
                </p>

                <p className="mt-4 text-lg leading-8">
                  Every morning, before the town had properly woken up, he would
                  sit outside his little home and build a small fire using
                  whatever dry twigs he could find. He had no proper coffee
                  roaster, so he placed the beans in an old iron pan and roasted
                  them directly over the flames. Sometimes the fire burned too
                  hot and the beans came out almost black. Sometimes the wind
                  blew ash into the pan. And sometimes he simply had to start
                  again.
                </p>

                <p className="mt-4 text-lg leading-8">
                  He slowly learned that coffee was less about having perfect
                  equipment and more about paying attention. He learned to
                  listen to the crackling beans, watch the changing color, and
                  recognize the moment when a warm, nutty aroma filled the air.
                  What began as necessity slowly became a craft.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  A Small Cup, A Big Dream
                </h2>

                <p className="mt-4 text-lg leading-8">
                  Word eventually spread through the neighborhood. People
                  started stopping by in the mornings, initially out of
                  curiosity and eventually because they wanted a cup of the
                  coffee everyone was talking about. He would serve each person
                  whatever he could make that day, sometimes adding milk,
                  sometimes sugar, and sometimes nothing at all.
                </p>

                <p className="mt-4 text-lg leading-8">
                  He never had a fancy storefront. There was no polished
                  counter, no expensive espresso machine, and no carefully
                  printed menu. There was simply a small fire, a few wooden
                  stools, the smell of freshly roasted beans, and conversations
                  that lasted much longer than expected.
                </p>

                <p className="mt-4 text-lg leading-8">
                  Over time, that little gathering place became more than a
                  place to drink coffee. It became somewhere people could pause,
                  talk, laugh, complain about their mornings, and sit quietly
                  when they had nothing to say. The coffee was only part of what
                  brought people back.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  From Fire to Kissa Mori
                </h2>

                <p className="mt-4 text-lg leading-8">
                  Years later, the spirit of that little coffee corner became
                  the inspiration for Kissa Mori. The name represents the idea
                  of a warm, welcoming place where people can slow down and
                  enjoy something simple. While our coffee is no longer roasted
                  over a fire in an old metal pan, the philosophy remains the
                  same.
                </p>

                <p className="mt-4 text-lg leading-8">
                  We believe coffee should feel approachable. It should be
                  something you can enjoy before a busy day, during a long
                  conversation, or simply while sitting by yourself with your
                  thoughts. Every part of Kissa Mori is designed around that
                  feeling: simple choices, thoughtful details, and a space that
                  feels a little warmer than the world outside.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-text-primary">
                  What We Believe
                </h2>

                <p className="mt-4 text-lg leading-8">
                  Kissa Mori is built around a simple belief that good things do
                  not always begin with perfect circumstances. Sometimes they
                  begin with very little: a few coffee beans, a small flame, an
                  old cup, and someone willing to try again after the first
                  batch burns.
                </p>

                <p className="mt-4 text-lg leading-8">
                  That is the spirit we want every cup at Kissa Mori to carry.
                  Whether you are here for your first coffee of the morning,
                  meeting someone you have not seen in years, or simply taking
                  five quiet minutes for yourself, we hope there is always a
                  little warmth waiting for you.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
