"use client";

interface PodcastHeaderProps {
  podcastName: string;
  episodeTitle: string;
  hostName: string;
}

export default function PodcastHeader({ podcastName, episodeTitle, hostName }: PodcastHeaderProps) {
  if (!podcastName && !episodeTitle && !hostName) return null;

  return (
    <div className="podcast-header">
      <div className="podcast-waveform">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="waveform-bar"
            style={{ animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>

      <div className="podcast-content">
        {episodeTitle && <h1 className="episode-title-large">{episodeTitle}</h1>}
        <div className="podcast-meta">
          {podcastName && <span className="podcast-name">{podcastName}</span>}
          {hostName && (
            <span className="host-info">
              <span className="host-sep">·</span>
              <span className="host-label">主播</span>
              <span className="host-name">{hostName}</span>
            </span>
          )}
        </div>
      </div>

      <div className="podcast-divider">
        <span className="divider-line" />
        <span className="divider-dot" />
        <span className="divider-line" />
      </div>
    </div>
  );
}
