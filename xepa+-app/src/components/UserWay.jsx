import { useEffect } from 'react';

function UserWay() {
  useEffect(() => {
    if (document.querySelector('[data-xepa-userway="true"]')) {
      return;
    }

    const script = document.createElement('script');

    script.src = 'https://cdn.userway.org/widget.js';
    script.setAttribute('data-account', 'y2KIm9pPv2');
    script.setAttribute('data-color', '#f76019');
    script.setAttribute('data-mobile', 'true');
    script.setAttribute('data-language', 'pt-BR');
    script.setAttribute('data-xepa-userway', 'true');
    script.async = true;

    const estilo = document.createElement('style');

    estilo.id = 'xepa-userway-position';
    estilo.textContent = `
      #userwayAccessibilityIcon,
      .uwy.userway_p1 .userway_buttons_wrapper {
        position: fixed !important;
        right: 20px !important;
        bottom: 20px !important;
        left: auto !important;
        top: auto !important;
        z-index: 99999 !important;
      }
    `;

    document.head.appendChild(estilo);
    document.body.appendChild(script);

    return () => {
      estilo.remove();
    };
  }, []);

  return null;
}

export default UserWay;
