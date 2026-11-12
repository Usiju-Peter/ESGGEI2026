import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { teamData } from "../data";
import { useDialogFocus } from "../lib/useDialogFocus";
export default function TeamGrid({
  summaries = false,
}: {
  summaries?: boolean;
}) {
  const [selected, setSelected] = useState<(typeof teamData)[number] | null>(
    null,
  );
  const close = useCallback(() => setSelected(null), []);
  const dialogRef = useDialogFocus(selected !== null, close);
  return (
    <>
      <div className="team-grid">
        {teamData.map((member) => (
          <article className="team-card" key={member.id}>
            <img
              src={member.image
                .replace(".jpg", "-full.webp")
                .replace("/team/", "/team/previews/")}
              srcSet={`${member.image.replace(".jpg", "-480.webp").replace("/team/", "/team/previews/")} 480w, ${member.image.replace(".jpg", "-full.webp").replace("/team/", "/team/previews/")} ${member.imageWidth}w`}
              sizes="(max-width: 767px) calc(100vw - 40px), 33vw"
              alt={member.name}
              width={member.imageWidth}
              height={member.imageHeight}
              loading="lazy"
              decoding="async"
            />
            <div className="team-card-copy">
              <h3 className="card-title">{member.name}</h3>
              <p>{member.role}</p>
              {summaries && <p className="team-summary">{member.shortBio}</p>}
              <button
                type="button"
                className="button button-text"
                onClick={() => setSelected(member)}
                aria-label={`Read biography of ${member.name}`}
              >
                Read biography
              </button>
            </div>
          </article>
        ))}
      </div>
      {selected && (
        <div
          className="dialog-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            className="bio-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="biography-title"
          >
            <button
              type="button"
              className="close-button"
              onClick={close}
              aria-label="Close biography"
            >
              <X aria-hidden="true" size={22} />
            </button>
            <h2 id="biography-title">{selected.name}</h2>
            <p className="text-muted">{selected.role}</p>
            <div className="reading-copy">
              {selected.fullBio.split("\n\n").map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
