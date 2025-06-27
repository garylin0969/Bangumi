import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/components/atoms/image-with-fallback';
import { RatingStars } from '@/components/atoms/rating-stars';
import { Subject } from '@/lib/api';
import { convertToTraditional } from '@/utils/opencc';
import { cn } from '@/utils/shadcn';

interface SubjectCardProps {
  subject: Subject;
  className?: string;
  showRating?: boolean;
  showSummary?: boolean;
}

export const SubjectCard = ({
  subject,
  className,
  showRating = true,
  showSummary = false
}: SubjectCardProps) => {
  const displayName = convertToTraditional(subject.name_cn || subject.name);
  const displaySummary = convertToTraditional(subject.summary || '');

  return (
    <Link
      to={`/subject/${subject.id}`}
      className={cn(
        'block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden',
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ImageWithFallback
            src={subject.images?.medium || subject.images?.common || ''}
            alt={displayName}
            className="w-20 h-28 object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {displayName}
          </h3>

          {showRating && subject.rating?.score > 0 && (
            <div className="mb-2">
              <RatingStars rating={subject.rating.score} size="sm" />
            </div>
          )}

          {showSummary && displaySummary && (
            <p className="text-sm text-gray-600 line-clamp-3">
              {displaySummary}
            </p>
          )}

          <div className="text-xs text-gray-500 mt-2">
            {subject.air_date && (
              <span>{subject.air_date}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};