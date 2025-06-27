import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/atoms/image-with-fallback';
import RatingStars from '@/components/atoms/rating-stars';
import { CalendarSubject, Subject } from '@/types';
import { convertToTraditional } from '@/utils/opencc';
import { cn } from '@/utils/shadcn';

interface SubjectCardProps {
    subject: Subject | CalendarSubject;
    className?: string;
    showRating?: boolean;
    showSummary?: boolean;
}

const SubjectCard = ({ subject, className, showRating = true, showSummary = false }: SubjectCardProps) => {
    const displayName = convertToTraditional(subject.name_cn || subject.name);
    const displaySummary = convertToTraditional(subject.summary || '');

    return (
        <Link
            to={`/subject/${subject.id}`}
            className={cn(
                'block overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg',
                className
            )}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <ImageWithFallback
                        src={subject.images?.medium || subject.images?.common || ''}
                        alt={displayName}
                        className="h-28 w-20 object-cover"
                    />
                </div>
                <div className="flex-1 p-4">
                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">{displayName}</h3>

                    {showRating && subject?.rating?.score && subject.rating.score > 0 && (
                        <div className="mb-2">
                            <RatingStars rating={subject.rating.score} size="sm" />
                        </div>
                    )}

                    {showSummary && displaySummary && (
                        <p className="line-clamp-3 text-sm text-gray-600">{displaySummary}</p>
                    )}

                    <div className="mt-2 text-xs text-gray-500">
                        {'air_date' in subject && subject.air_date && <span>{subject.air_date}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SubjectCard;
