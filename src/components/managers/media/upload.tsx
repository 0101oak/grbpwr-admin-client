import React, { FC, useCallback, useEffect, useState } from 'react';
import { getAllUploadedFiles, deleteFiles } from 'api/admin';
import { common_Media } from 'api/proto-http/admin';
import { Layout } from 'components/login/layout';
import styles from 'styles/upload.scss';

function copyToClipboard(text: string | undefined) {
  const textArea = document.createElement('textarea');
  textArea.value = text || '';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function formatDate(dateString: string | number | Date | undefined) {
  if (!dateString) {
    return '';
  }

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options as Intl.DateTimeFormatOptions);
}

export const UploadPage: FC = () => {
  const [filesUrl, setFilesUrl] = useState<common_Media[]>([]);
  const [order, setOrder] = useState<'plus' | 'minus'>('plus');
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 300 >= document.documentElement.offsetHeight &&
        !isLoading &&
        hasMore
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  const fetchData = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const limit = 2;
    try {
      const response = await getAllUploadedFiles({
        limit: limit,
        offset: offset,
        orderFactor: 'ORDER_FACTOR_DESC',
      });
      const url = response.list || [];
      setFilesUrl((prevUrls) => [...prevUrls, ...url]);
      setOffset((prevOffset) => prevOffset + url.length);
      setHasMore(url.length === limit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (id: number | undefined) => {
    try {
      const response = await deleteFiles({ id });
      console.log(response);
      setFilesUrl((currentFiles) => currentFiles.filter((file) => file.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAndPaginatedFiles = filesUrl?.filter((file) => {
    if (filter === 'image') {
      return (
        file.media?.fullSize?.toLowerCase().endsWith('.jpg') ||
        file.media?.fullSize?.toLowerCase().endsWith('.jpeg') ||
        file.media?.fullSize?.toLowerCase().endsWith('.png')
      );
    } else if (filter === 'video') {
      return (
        file.media?.fullSize?.toLowerCase().endsWith('.mp4') ||
        file.media?.fullSize?.toLowerCase().endsWith('.webm')
      );
    } else {
      return true;
    }
  });

  return (
    <Layout>
      <div className={styles.media_container}>
        <h2>media manager</h2>
        <div className={styles.media_main}>
          <div className={styles.media_sort}>
            <h3>sort by</h3>
            <div className={styles.sort_wrapper}>
              <button
                onClick={() => setOrder(order === 'plus' ? 'minus' : 'minus')}
                className={styles.sort_btn}
              >
                DATE {order === 'plus' ? '-' : '+'}
              </button>
              <button onClick={() => setFilter('image')} className={styles.filter_btn}>
                Images
              </button>
              <button onClick={() => setFilter('video')} className={styles.filter_btn}>
                Videos
              </button>
            </div>
          </div>
          <ul className={styles.media_list}>
            {filteredAndPaginatedFiles?.map((file) => (
              <li key={file.id || file.media?.fullSize}>
                {file.media?.fullSize?.toLowerCase().endsWith('.mp4') ||
                file.media?.fullSize?.toLowerCase().endsWith('.webm') ? (
                  <video controls>
                    <source src={file.media?.fullSize} type='video/mp4' />
                  </video>
                ) : (
                  <img src={file.media?.fullSize} alt='' />
                )}
                <div>
                  <button type='button' onClick={() => deleteFile(file.id)}>
                    x
                  </button>
                  <h3>{formatDate(file.createdAt)}</h3>
                </div>
              </li>
            ))}
          </ul>
          {isLoading && <div>Loading more items...</div>}
          {/* pagination here */}
        </div>
      </div>
    </Layout>
  );
};
