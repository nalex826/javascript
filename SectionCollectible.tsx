import { FC, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'swiper';
import { Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import Styled from './SectionCollectible.styles';
import { nameSpace } from '../../../modules/i18n';
import Image from '../../../components/media/Image';
import { ReactComponent as ArrowIcon } from '../../../components/icons/iconic/custom-arrow.svg';
import 'swiper/css';

type itemProps = {
  id: number;
  faction: string;
  title: string;
  path: string;
  badge: string;
  badgeName: string;
  bio: string;
};

const SectionCollectible: FC = () => {
  const { t } = useTranslation(nameSpace.home);
  const [progressActive, setProgressActive] = useState<string>('earth');
  const collectItems = t<string, itemProps[]>('home.collectible.assets', { returnObjects: true });
  const [MousePosition, setMousePosition] = useState({
    left: -10,
    top: -20,
  });
  const [MousePosition2, setMousePosition2] = useState({
    left: -20,
    top: -30,
  });
  function handleMouseMove(event: MouseEvent) {
    const x = (window.innerWidth - event.pageX * 5) / 300;
    const y = (window.innerHeight - event.pageY * 5) / 300;
    const x2 = (window.innerWidth - event.pageX * 8) / 300;
    const y2 = (window.innerHeight - event.pageY * 8) / 300;
    setMousePosition({ left: x, top: y });
    setMousePosition2({ left: x2, top: y2 });
  }

  return (
    <Styled.HeaderSection>
      <Swiper
        slidesPerView="auto"
        loop
        speed={800}
        navigation={{
          nextEl: '.swiper-next-arrow',
        }}
        onSlideChange={swiper => {
          const index = swiper.realIndex;
          setProgressActive(collectItems[index].faction);
        }}
        modules={[Navigation]}
      >
        {collectItems.map(({ id, faction, title, path, badge, badgeName, bio }) => (
          <SwiperSlide key={id} data-color={faction}>
            <Styled.ImageWrapper>
              <div className="hidden">
                <Image source={`/assets/${faction}_lhu_card.png`} alt={title} />
              </div>
              <div
                className="parallax"
                style={{ transform: `translate(${MousePosition2.left}px, ${MousePosition2.top}px)` }}
              >
                <Image source={`/assets/${faction}_lhu_card.png`} alt={title} />
              </div>
              <div
                className="parallax"
                onMouseMove={handleMouseMove}
                style={{ transform: `translate(${MousePosition.left}px, ${MousePosition.top}px)` }}
              >
                <Image source={`/assets/${path}`} alt={title} />
              </div>
            </Styled.ImageWrapper>
            <Styled.Overlay>
              <Container style={{ height: '100%' }}>
                <Styled.OverlayContent>
                  <div className="img-wrapper">
                    <img className="img-fluid" src={`/assets/${badge}`} alt={title} />
                    <div className="rarity">{badgeName}</div>
                  </div>
                  <h4 className={`text-uppercase ${faction}`}>{faction}</h4>
                  <h3 className="text-uppercase">{title}</h3>
                  <p>{bio}</p>
                </Styled.OverlayContent>
              </Container>
            </Styled.Overlay>
          </SwiperSlide>
        ))}
        <div className={progressActive ? `swiper-next-arrow ${progressActive}` : 'swiper-next-arrow'}>
          <Styled.Icon icon={<ArrowIcon />} fill="#000000" direction="-1" responsive />
          <Styled.Icon icon={<ArrowIcon />} fill="#FEC300" direction="-1" responsive />
        </div>
      </Swiper>
    </Styled.HeaderSection>
  );
};

export default SectionCollectible;
