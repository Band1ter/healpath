import { Story } from "@/types/story";
import StoryCard from "./StoryCard";

interface StoryFeedProps {
  stories: Story[];
}

export default function StoryFeed({ stories }: StoryFeedProps) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-16 text-[#9B8AC4]">
        <p className="text-lg mb-2">No stories yet.</p>
        <p className="text-sm">Be the first to share.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
