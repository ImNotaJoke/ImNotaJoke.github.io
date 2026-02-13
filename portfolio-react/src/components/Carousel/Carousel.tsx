import { useRef, useState, useEffect, useCallback } from "react";
import { useGitHubRepos } from "../../hooks/useGitHubRepos";
import RepoCard from "../RepoCard/RepoCard";
import "./Carousel.css";

export default function Carousel() {
  const { repos, loading, error } = useGitHubRepos(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container || !container.children.length) return;
      const clamped = Math.max(
        0,
        Math.min(index, container.children.length - 1)
      );
      const card = container.children[clamped] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setCurrentIndex(clamped);
    },
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1 >= repos.length ? 0 : prev + 1;
      goToSlide(next);
      return next;
    });
  }, [repos.length, goToSlide]);

  const startAutoScroll = useCallback(() => {
    autoRef.current = setInterval(nextSlide, 4000);
  }, [nextSlide]);

  const pauseAutoScroll = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => startAutoScroll(), 5000);
  }, [startAutoScroll]);

  useEffect(() => {
    if (repos.length > 0) startAutoScroll();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [repos.length, startAutoScroll]);

  // Touch/drag support
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = containerRef.current?.scrollLeft || 0;
    pauseAutoScroll();
    containerRef.current!.style.scrollBehavior = "auto";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const walk = startX.current - e.clientX;
    containerRef.current.scrollLeft = scrollStart.current + walk;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
      // snap to closest
      const container = containerRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      let closestIdx = 0;
      let closestDist = Infinity;
      cards.forEach((card, idx) => {
        const dist = Math.abs(
          card.offsetLeft - container.offsetLeft - container.scrollLeft
        );
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });
      goToSlide(closestIdx);
    }
  };

  if (loading) return <div className="repos-container">Loading...</div>;
  if (error) return <div className="repos-container">Error: {error}</div>;

  return (
    <>
      <div
        className="repos-container"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={pauseAutoScroll}
      >
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className="repos-dots">
        {repos.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => {
              goToSlide(i);
              pauseAutoScroll();
            }}
          />
        ))}
      </div>
    </>
  );
}
