import { FC } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { ROUTES } from 'constants/routes';
import { Layout } from 'components/login/layout';
import styles from 'styles/main.scss';

export const Main: FC = () => {
  const navigate = useNavigate();

  const navigateMediaManager = () => {
    navigate({ to: ROUTES.media, replace: true });
  };

  const navigateProductManager = () => {
    navigate({ to: ROUTES.product, replace: true });
  };

  const navigateHero = () => {
    navigate({ to: ROUTES.hero, replace: true });
  };

  const navigatePromo = () => {
    navigate({ to: ROUTES.promo, replace: true });
  };

  const navigateArchive = () => {
    navigate({ to: ROUTES.archive, replace: true });
  };

  return (
    <Layout>
      <div className={styles.main}>
        <button onClick={navigateMediaManager} className={styles.btn}>
          MEDIA
        </button>
        <button onClick={navigateProductManager} className={styles.btn}>
          PRODUCTS
        </button>
        <button className={styles.btn}>ORDERS</button>
        <button className={styles.btn} onClick={navigateHero}>
          HERO
        </button>
        <button className={styles.btn} onClick={navigatePromo}>
          PROMO
        </button>
        <button className={styles.btn} onClick={navigateArchive}>
          ARCHIVE
        </button>
      </div>
    </Layout>
  );
};
