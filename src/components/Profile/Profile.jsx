import { Fragment, useState } from 'react';
import { default as profileImg, default as profileImgLarge } from '~/assets/me.png';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import { Button } from '~/components/Button';
import { DecoderText } from '~/components/DecoderText';
import { Divider } from '~/components/Divider';
import { Heading } from '~/components/Heading';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';
import { Section } from '~/components/Section';
import { Text } from '~/components/Text';
import { Transition } from '~/components/Transition';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m John, currently I live in Lorem ipsum dolor sit amet consectetur, adipisicing
      elit. Quasi, quam.{' '}
      <Link href="https://www.example.com" target="_blank">
        Example
      </Link>
      . Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, consequatur
      dicta. Voluptate a, cumque enim praesentium repudiandae, aperiam sint placeat odit
      architecto iusto inventore culpa, minima labore sapiente asperiores pariatur!
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga debitis, ullam
      tempore ad culpa, blanditiis cumque id accusamus harum officiis veritatis nemo
      tempora dignissimos! Odio unde cupiditate enim laudantium repellendus?
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                View my Resume
              </Button>
            </div>
            <div className={`${styles.column} ${styles.profileImageSection}`}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  style={{
                    clipPath:
                      'polygon(0 0, 100% 0, 100% 20%, 100% 91%, 92% 100%, 0 100%, 0% 80%, 0% 20%)',
                  }}
                  alt="Me smiling 😁"
                />
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`./katakana.svg#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};