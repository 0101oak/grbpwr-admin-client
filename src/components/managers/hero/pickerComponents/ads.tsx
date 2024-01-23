import React, { FC, useState } from 'react';
import styles from 'styles/hero.scss';

interface AdsProps {
  filesUrl: string[];
  selectedImage: string[];
  handleThumbnail: () => void;
  thumbnailInput: boolean;
  newAdUrl: string;
  setNewAdUrl: (url: string) => void;
  newExploreText: string;
  setNewExploreText: (text: string) => void;
  handleAddByUrl: () => void;
  handleViewAll: () => void;
  showMediaSelector: boolean;
  select: (url: string) => void;
  exploreTextMap: Record<string, string>;
  handleExploreTextChange: (url: string, value: string) => void;
  handleAddToAds: () => void;
}

export const Ads: FC<AdsProps> = ({
  filesUrl,
  selectedImage,
  handleThumbnail,
  thumbnailInput,
  newAdUrl,
  setNewAdUrl,
  handleAddByUrl,
  handleViewAll,
  showMediaSelector,
  select,
  exploreTextMap,
  handleExploreTextChange,
  handleAddToAds,
  newExploreText,
  setNewExploreText,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const startId = (currentPage - 1) * itemsPerPage;
  const endId = startId + itemsPerPage;
  const files = filesUrl.slice(startId, endId);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(filesUrl.length / itemsPerPage) ? prevPage + 1 : prevPage,
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div>
      <label htmlFor='thhumbnail'>ads</label>
      <div className={styles.section}>
        <button type='button' onClick={handleThumbnail} className={styles.btn}>
          by url
        </button>
        {thumbnailInput && (
          <div>
            <input
              type='text'
              name='contentLink'
              value={newAdUrl}
              onChange={(e) => setNewAdUrl(e.target.value)}
            />
            <input
              type='text'
              name='exploreText'
              value={newExploreText}
              onChange={(e) => setNewExploreText(e.target.value)}
            />
            <button type='button' onClick={handleAddByUrl}>
              Add by URL
            </button>
          </div>
        )}
        <button type='button' onClick={handleViewAll} className={styles.btn}>
          Media Selector
        </button>
      </div>
      {showMediaSelector && (
        <div>
          <ul>
            {files.map((url, index) => (
              <li key={index}>
                <input
                  type='checkbox'
                  checked={selectedImage.includes(url)}
                  onChange={() => select(url)}
                  id={`${index}`}
                  style={{ display: 'none' }}
                />
                <label htmlFor={`${index}`}>
                  {selectedImage.includes(url) ? (
                    <span>{selectedImage.indexOf(url) + 1}</span>
                  ) : null}
                  <img
                    key={index}
                    src={url}
                    alt={url}
                    style={{ width: '100px', height: '100px' }}
                  />
                  {selectedImage.includes(url) && (
                    <input
                      type='text'
                      placeholder='Explore Text'
                      value={exploreTextMap[url] || ''}
                      onChange={(e) => handleExploreTextChange(url, e.target.value)}
                    />
                  )}
                </label>
              </li>
            ))}
            <button type='button' onClick={prevPage}>
              1
            </button>
            <button type='button' onClick={nextPage}>
              2
            </button>
          </ul>
          <div>
            <button type='button' onClick={handleAddToAds}>
              add
            </button>
          </div>
        </div>
      )}
      {/* <button type='button' onClick={addNewHero}>
        ok
      </button> */}
    </div>
  );
};
