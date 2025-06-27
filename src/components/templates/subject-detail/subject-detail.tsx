import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/atoms/loading-spinner';
import RatingStars from '@/components/atoms/rating-stars';
import ImageWithFallback from '@/components/atoms/image-with-fallback';
import { GetSubject, GetSubjectCharacters, GetSubjectEpisodes } from '@/api/api';
import { SUBJECT_TYPES } from '@/types/bangumi';
import { convertToTraditional } from '@/utils/opencc';

const getSubjectTypeName = (type: number): string => {
  const typeMap = {
    [SUBJECT_TYPES.BOOK]: '書籍',
    [SUBJECT_TYPES.ANIME]: '動畫',
    [SUBJECT_TYPES.MUSIC]: '音樂',
    [SUBJECT_TYPES.GAME]: '遊戲',
    [SUBJECT_TYPES.REAL]: '真人',
  };
  return typeMap[type as keyof typeof typeMap] || '未知';
};

 const SubjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const subjectId = Number(id);

  const { data: subject, isLoading: subjectLoading, error: subjectError } = useQuery({
    queryKey: ['subject', subjectId],
    queryFn: () => GetSubject(subjectId),
    enabled: !!subjectId,
  });

  const { data: characters, isLoading: charactersLoading } = useQuery({
    queryKey: ['subject-characters', subjectId],
    queryFn: () => GetSubjectCharacters(subjectId),
    enabled: !!subjectId,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ['subject-episodes', subjectId],
    queryFn: () => GetSubjectEpisodes(subjectId, 0, 20, 0),
    enabled: !!subjectId,
  });

  if (subjectLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (subjectError || !subject) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">載入失敗：條目不存在或網路錯誤</p>
      </div>
    );
  }

  const displayName = convertToTraditional(subject.name_cn || subject.name);
  const displaySummary = convertToTraditional(subject.summary || '');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 基本信息 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <ImageWithFallback
              src={subject.images?.large || subject.images?.common || ''}
              alt={displayName}
              className="w-48 h-64 rounded-lg shadow-md"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {displayName}
              </h1>
              {subject.name !== (subject.name_cn || subject.name) && (
                <p className="text-lg text-gray-600">{subject.name}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {getSubjectTypeName(subject.type)}
              </span>
              {subject.air_date && (
                <span>首播：{subject.air_date}</span>
              )}
            </div>

            {subject.rating?.score > 0 && (
              <div>
                <RatingStars rating={subject.rating.score} size="lg" />
                <p className="text-sm text-gray-600 mt-1">
                  共 {subject.rating.total} 人評分
                </p>
              </div>
            )}

            {subject.collection && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{subject.collection.wish}</div>
                  <div className="text-gray-600">想看</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{subject.collection.doing}</div>
                  <div className="text-gray-600">在看</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{subject.collection.collect}</div>
                  <div className="text-gray-600">看過</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{subject.collection.on_hold}</div>
                  <div className="text-gray-600">擱置</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">{subject.collection.dropped}</div>
                  <div className="text-gray-600">拋棄</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {displaySummary && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">簡介</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {displaySummary}
            </p>
          </div>
        )}

        {subject.tags && subject.tags.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">標籤</h2>
            <div className="flex flex-wrap gap-2">
              {subject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {convertToTraditional(tag.name)} ({tag.count})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 角色列表 */}
      {charactersLoading ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">角色</h2>
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        characters && characters.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">角色</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.slice(0, 12).map((character) => (
                <div key={character.id} className="text-center">
                  <ImageWithFallback
                    src={character.images?.medium || ''}
                    alt={convertToTraditional(character.name)}
                    className="w-20 h-28 rounded-lg mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {convertToTraditional(character.name)}
                  </p>
                </div>
              ))}
            </div>
            {characters.length > 12 && (
              <p className="text-center text-gray-600 mt-4">
                還有 {characters.length - 12} 個角色...
              </p>
            )}
          </div>
        )
      )}

      {/* 章節列表 */}
      {episodesLoading ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">章節</h2>
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        episodes && episodes.data.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              章節 ({episodes.total})
            </h2>
            <div className="space-y-2">
              {episodes.data.map((episode) => (
                <div
                  key={episode.id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-sm font-medium text-gray-600">
                      {episode.sort || episode.ep}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {convertToTraditional(episode.name_cn || episode.name)}
                    </p>
                    {episode.airdate && (
                      <p className="text-xs text-gray-500">{episode.airdate}</p>
                    )}
                  </div>
                  {episode.duration && (
                    <div className="flex-shrink-0 text-xs text-gray-500">
                      {episode.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {episodes.total > episodes.data.length && (
              <p className="text-center text-gray-600 mt-4">
                顯示 {episodes.data.length} / {episodes.total} 章節
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SubjectDetail;