document.addEventListener('DOMContentLoaded', () => {

    /* --- Lógica do Cursor Customizado --- */
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Atualiza a posição do cursor principal instantaneamente
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Anima o seguidor do cursor
    function animateCursor() {
        posX += (mouseX - posX) / 9; // O "9" controla a suavidade/atraso
        posY += (mouseY - posY) / 9;

        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';

        requestAnimationFrame(animateCursor); // Chama a função novamente na próxima renderização
    }

    animateCursor(); // Inicia a animação

    // Adiciona classes para o efeito hover do cursor em elementos interativos
    document.querySelectorAll('a, button, .project-item, .service-item, .testimonial-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });


    /* --- Animação de Texto e Elementos no Hero (GSAP) --- */
    gsap.registerPlugin(ScrollTrigger); // Garante que o plugin está registrado

    // Animação para o título e parágrafos do Hero
    gsap.from(".hero h1", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5 // Delay inicial antes de tudo começar
    });

    gsap.from(".hero p.animated-text.delay-1", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8
    });

    gsap.from(".hero .btn-primary.animated-element.delay-2", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.2
    });


    /* --- Animação Scroll-Reveal para Seções (GSAP ScrollTrigger) --- */

    // Função genérica para animar seções ao rolar
    const animateSection = (selector) => {
        gsap.from(selector, {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: selector,
                start: "top 85%", // Começa a animar quando o topo da seção está a 85% da viewport
                toggleActions: "play none none none", // Apenas reproduz uma vez
                // markers: true // Descomente para ver os marcadores de ScrollTrigger
            }
        });
    };

    // Aplica a animação para cada seção
    animateSection("#sobre");
    animateSection("#servicos");
    animateSection("#portfolio");
    animateSection("#testemunhos");
    animateSection("#contato");

    // Animação específica para os itens dentro das grades (portfólio, serviços, testemunhos)
    gsap.utils.toArray(".project-item, .service-item, .testimonial-item").forEach(item => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%", // Um pouco mais cedo para itens menores
                toggleActions: "play none none none",
            }
        });
    });

});