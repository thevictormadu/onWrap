import {useEffect, useState, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {EmojiParticle, FloatingEmojisProps} from '../types';

export default function FloatingEmojis({emojiList, zIndex = 0}: FloatingEmojisProps) {
    const [emojis, setEmojis] = useState<EmojiParticle[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const emojiRef = useRef<EmojiParticle[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const addEmoji = () => {
        const newEmoji: EmojiParticle = {
            id: Date.now() + Math.random(),
            emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
            style: {
                size: isMobile ? Math.random() + 0.2 : Math.random() * 1.5 + 0.5,
                velocity: isMobile ? Math.random() * 7 + 20 : Math.random() * 7 + 20,
                xStart: Math.random() * 100,
                xEnd: Math.random() * 100,
                curve: Math.random() * 10 - 5,
                blur: Math.random() < (isMobile ? 0.1 : 0.3),
            },
        };

        emojiRef.current.push(newEmoji);
        setEmojis([...emojiRef.current]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            addEmoji();
            setTimeout(() => {
                emojiRef.current.shift();
                setEmojis([...emojiRef.current]);
            }, 10000);
        }, 1000);

        return () => clearInterval(interval);
    }, [isMobile]);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                overflow: 'hidden',
                width: '100vw',
                height: '100vh',
                zIndex: zIndex,
            }}
        >
            <AnimatePresence>
                {emojis.map(({id, emoji, style}) => (
                    <motion.div
                        key={id}
                        initial={{
                            y: '100%',
                            x: `${style.xStart}%`,
                            scale: style.size,
                            opacity: 0,
                        }}
                        animate={{
                            y: '-10%',
                            x: [`${style.xStart}%`, `${style.xStart + style.curve}%`, `${style.xEnd}%`],
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: style.velocity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: `${style.size}rem`,
                            inset: 0,
                            filter: style.blur ? 'blur(4px)' : 'none',
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}