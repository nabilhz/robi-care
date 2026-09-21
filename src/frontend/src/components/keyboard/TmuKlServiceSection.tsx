import { Section, SectionHeading } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  FileText,
  HeartHandshake,
  type LucideIcon,
  Mic,
  Play,
} from "lucide-react";
import { useState } from "react";

const VIDEO_ID = "awLL16O-bXM";

const VIDEO_TITLE =
  "TMU-KL Keyboard Liberation Service — speech-driven clinical documentation walkthrough";

const VIDEO_POSTER = {
  src: `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
  alt: "Video thumbnail: a clinician speaking with a patient while a structured clinical note is drafted on screen beside them.",
};

const BENEFITS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Mic,
    title: "Capture by speaking",
    description:
      "Patient encounter details are captured naturally through speech instead of typing, so the clinician stays in the conversation.",
  },
  {
    icon: FileText,
    title: "Structure automatically",
    description:
      "The captured encounter is automatically structured and organised into clinical documentation that follows the clinic's template.",
  },
  {
    icon: CalendarCheck,
    title: "Draft the follow-up work",
    description:
      "Draft notes, orders, and follow-up scheduling are prepared for clinician review, ready to be checked rather than written from scratch.",
  },
  {
    icon: HeartHandshake,
    title: "Less administration",
    description:
      "Administrative burden drops, so clinicians spend more of their time with patients and less of it at a keyboard.",
  },
];

/**
 * TMU-KL Keyboard Liberation Service: an inline click-to-play walkthrough video
 * with the four clinician benefits it delivers. The video loads only after the
 * visitor activates the poster, so nothing is requested from YouTube on load.
 */
export function TmuKlServiceSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Section id="tmu-kl-service" alt>
      <SectionHeading
        eyebrow="TMU-KL service"
        title="TMU-KL Keyboard Liberation Service"
        description="A speech-driven documentation service built with Toronto Metropolitan University's Knowledge Lab. Watch the walkthrough, then see what it changes for the clinician in the room."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="overflow-hidden rounded-xl border-hairline bg-card shadow-subtle">
          <div className="relative aspect-video w-full bg-deep">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play video: ${VIDEO_TITLE}`}
                data-ocid="keyboard.video.play_button"
                className="group absolute inset-0 flex size-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <img
                  src={VIDEO_POSTER.src}
                  alt={VIDEO_POSTER.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-deep/45 transition-smooth group-hover:bg-deep/30"
                />
                <span className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-smooth group-hover:scale-105 group-hover:bg-accent md:size-20">
                  <Play className="ml-1 size-7 fill-current md:size-8" />
                </span>
              </button>
            )}
          </div>
          <p className="border-t border-hairline bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            The walkthrough plays inline on this page. Nothing is loaded from
            YouTube until you press play.
          </p>
        </div>

        <div>
          <p className="eyebrow rule-accent inline-block pb-2">
            What it changes
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Four gains for the clinician
          </h3>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {BENEFITS.map((benefit, index) => (
              <li
                key={benefit.title}
                data-ocid={`keyboard.benefit.${index + 1}`}
                className={cn(
                  "flex h-full flex-col rounded-xl border-hairline bg-card p-6 shadow-subtle",
                  "transition-smooth hover:border-primary/40 hover:shadow-elevated",
                )}
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <benefit.icon className="size-5" aria-hidden="true" />
                </span>
                <h4 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                  {benefit.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 max-w-3xl border-l-2 border-primary/30 pl-5">
        <p className="text-base font-semibold text-foreground">
          AI may assist. The clinician decides.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The service assists with documentation and drafting only. It does not
          diagnose, prescribe, or act. A qualified clinician reviews and
          approves all clinical content before it is used, and nothing generated
          reaches the patient record without that sign-off.
        </p>
      </div>
    </Section>
  );
}
