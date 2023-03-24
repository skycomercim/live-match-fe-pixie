import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const Goal = ({ typeEvent}) => {
    const imageRef = useRef(null);
    const textRef = useRef(null);
    console.log("Goal typeEvent :: ", typeEvent);

    useEffect(() => {
        // Verifica se il tipo di evento è "goal"
        if (typeEvent !== 'goal') {
            return;
        }

        // Configurazione animazione fadeIn
        const fadeInAnimation = anime({
            targets: [imageRef.current, textRef.current],
            opacity: [0, 1],
            scale: [0.9],
            duration: 1000,
            easing: 'linear',
        });

        anime({
            targets: [imageRef.current, textRef.current],
            scale: [0.9, 1],
            duration: 800,
            direction: 'alternate',
            easing: 'easeInOutQuad',
            loop: true
        });

        // Configurazione animazione fadeOut
        const fadeOutAnimation = anime({
            targets: [imageRef.current, textRef.current],
            opacity: [1, 0],
            duration: 1000,
            delay: 4000, // Ritarda l'avvio dell'animazione di 4 secondi
            easing: 'easeOutQuad',
        });

        // Esegui l'animazione al caricamento del componente
        fadeInAnimation.play();

        // Interrompi tutte le animazioni e rendi invisibili gli elementi dopo 5 secondi
        setTimeout(() => {
            fadeInAnimation.pause();
            fadeOutAnimation.pause();
            anime.set([imageRef.current, textRef.current], { opacity: 0 });
        }, 5000)

        // Rimuovi l'animazione quando il componente viene smontato
        return () => {
            fadeInAnimation.pause();
            fadeOutAnimation.pause();
        };
    }, [typeEvent]);



    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '20', left: '0', top: '0px' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                    ref={imageRef}
                    src={'./goal.png'}
                    alt="Immagine goal"
                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: '0', left: '0' }}
                />
                <div
                    ref={textRef}
                    style={{
                        position: 'absolute',
                        top: '60%',
                        transform: 'translateY(-50%)',
                        fontSize: '3em',
                        fontWeight: 'bold',
                        color: '#fff',
                        opacity: '0',
                        right: '20px'
                    }}
                >
                    GOAAAAL!
                </div>
            </div>
        </div>
    );
};

export default Goal;
